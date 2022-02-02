import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import { Router } from '@angular/router';

import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { FacultyI } from 'src/app/models/institution/faculty';

@Component({
  selector: 'app-show-faculties',
  templateUrl: './show-faculties.component.html',
  styleUrls: ['./show-faculties.component.scss']
})
export class ShowFacultiesComponent implements OnInit {
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  public faculties:FacultyI[]=[];
  first = 0;
  loading: boolean = true;
 
  rows = 1;
  cols: any[]=[];

  private rows2:FacultyI[] = []

  exportColumns: any[]=[];
  selectedProducts: FacultyI[]=[];

  constructor(
    private facultyService: FacultyService,
    private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }


  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loading = false;
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'Administrative', header: 'Decanatura' },
      { field: 'Headquarter', header: 'Sede' },
      { field: 'University', header: 'Universidad' },
      { field: 'createdAt', header: 'Fecha' }
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getAllFaculty()
    
  }
  Buscar(event: Event, dt1:any){
    event.preventDefault();
    
      const filterValue = (event.target as HTMLInputElement).value;
      dt1.filterGlobal(filterValue, 'contains')
  }

  getAllFaculty() {
    
    this.facultyService.getList().subscribe((facultiesFromApi) => {
      this.faculties =facultiesFromApi.facultys
      this.rows2=[]
      if(facultiesFromApi.facultys != undefined){
        for (const key of facultiesFromApi.facultys) {
          if( key.createdAt)
          this.rows2.push(
            {
              name:  key.name,
              AdministrativeId:  key.AdministrativeId,
              HeadquarterId: key.HeadquarterId,
              createdAt:  key.createdAt,
              Administrative:key.Administrative,
              Headquarter:key.Headquarter
            }
          )
        }
      }
      // this.faculties.paginator = this.paginator;
      // this.faculties.sort = this.sort;
      // console.log(this.faculties);
    }, error => console.error(error));
  }

  async gerenratePdf(){
    const DATA = <HTMLDivElement> document.getElementById('todo');
    var headers = [{
      fila_0:{
          col_1:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_2:{ text: 'DECANO', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_3:{ text: 'SEDE', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_4:{ text: 'UNIVERSIDAD', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_5:{ text: 'FECHA', style: 'tableHeader',fontSize: 12 ,bold: true, }
      }
    }]
  
    var body = [];
    for (var key in headers){
        if (headers.hasOwnProperty(key)){
            var header = headers[key];
            var row:any[] = [ header.fila_0.col_1,header.fila_0.col_2,
              header.fila_0.col_3,header.fila_0.col_4,header.fila_0.col_5]
            body.push(row);
        }
    }
    for (var key in this.rows2) 
    {
        if (this.rows2.hasOwnProperty(key))
        {
            var data = this.rows2[key];
            var row:any[] = [data.name.toString(),data.Administrative?.User?.fullName.toString(),
              data.Headquarter?.name.toString(),data.Headquarter?.University?.name.toString(),data.createdAt?.toString()]
  
            body.push(row);
        }
    }
  
    const pdfDefinition: any = {
  
      footer: {
        columns: [ ]
      },
      content: [
        {
          columns: [
            {
                image: await getBase64ImageFromURL(
                  "././assets/images/logo-uniguajira.png"),
                height: 100,
                width: 300,
            },
            {
              width: '*',
              text: `Facultades`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
            }
          ],
  
          columnGap: 10,
  
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
              widths: [ '15%', '20%', '15%','25%','25%'],
  
              body: body
          },
          layout: 'headerLineOnly',
          margin: [ 15, 0, 0, 15 ]
      },  
        
      ]
  
    }
  
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  

  exportExcel() {
    // console.log('excel')
  
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.faculties);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "faculties");
    });
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
   
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  editar(id: number){
    this.modificar.emit(id)
  }
  
  delet(id: number){
    this.modificar.emit(id)
  }
  detalle(id: number){
    this.modificar.emit(id)
  }
}
