import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { HeadquarterI } from 'src/app/models/institution/headquarter';

@Component({
  selector: 'app-show-headquarter',
  templateUrl: './show-headquarter.component.html',
  styleUrls: ['./show-headquarter.component.scss']
})
export class ShowHeadquarterComponent implements OnInit {
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  public headquarters:HeadquarterI[]=[];
  first = 0;
  loading: boolean = true;
 
  rows = 1;
  cols: any[]=[];

  private rows2:HeadquarterI[] = []

  exportColumns: any[]=[];
  selectedProducts: HeadquarterI[]=[];
  constructor(private headquarterService: HeadquarterService,
    private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loading = false;
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'cordinatorInvestigation', header: 'Coordinador de Investigación' },
      { field: 'University.name', header: 'Universidad' },
      { field: 'createdAt', header: 'Fecha' }
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getAllHeadquarter()
  }
  Buscar(event: Event, dt1:any){
    event.preventDefault();
    
      const filterValue = (event.target as HTMLInputElement).value;
      dt1.filterGlobal(filterValue, 'contains')
  }
  getAllHeadquarter() {
    
    this.headquarterService.getList().subscribe((headquartersFromApi) => {
      this.headquarters = headquartersFromApi.headquarters
      this.rows2=[]
      if(headquartersFromApi.headquarters != undefined){
        for (const key of headquartersFromApi.headquarters) {
          this.rows2.push(
            {
              name:  key.name,
              cordinatorInvestigation:  key.cordinatorInvestigation,
              UniversityId: key.UniversityId,
              University:key.University,
              createdAt:key.createdAt
            }
          )
        }
      }
    }, error => console.error(error));


  }

  async gerenratePdf(){
    const DATA = <HTMLDivElement> document.getElementById('todo');
    var headers = [{
      fila_0:{
          col_1:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_2:{ text: 'CORDINADOR DE INVESTIGACION', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_3:{ text: 'UNIVERSIDAD', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_4:{ text: 'FECHA', style: 'tableHeader',fontSize: 12 ,bold: true, }
      }
    }]
  
    var body = [];
    for (var key in headers){
        if (headers.hasOwnProperty(key)){
            var header = headers[key];
            var row:any[] = [ header.fila_0.col_1,header.fila_0.col_2,
              header.fila_0.col_3,header.fila_0.col_4]
            body.push(row);
        }
    }
    if(this.selectedProducts.length > 0){
      for (const key in this.selectedProducts) {
        if (this.selectedProducts.hasOwnProperty(key))
        {
            var data = this.selectedProducts[key];
            var row:any[] = [
              data.name.toString(),data.cordinatorInvestigation.toString(),
              data.University?.name.toString(),data.createdAt?.toString()
            ]
            body.push(row);
            
        }
      }
    }else{
    for (var key in this.rows2) 
    {
        if (this.rows2.hasOwnProperty(key))
        {
            var data = this.rows2[key];
            var row:any[] = [data.name.toString(),data.cordinatorInvestigation.toString(),
              data.University?.name.toString(),data.createdAt?.toString()]
  
            body.push(row);
        }
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
              text: `Sedes`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
            }
          ],
  
          columnGap: 10,
  
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
              widths: [ '25%', '25%','25%','25%'],
  
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
    let array:any[] = [];
    if(this.selectedProducts.length > 0){
      for (const key of this.selectedProducts) {
        array.push({ 
          id: key.id,
        Nombre_Completo:key.name,
        Coordinador_de_Investigación:key.cordinatorInvestigation,
        University:key.University?.name
        })
      }
    }else{
    for (const key of this.headquarters) {
      array.push({ 
        id: key.id,
        Nombre_Completo:key.name,
        Coordinador_de_Investigación:key.cordinatorInvestigation,
        University:key.University?.name
      })
    }
  }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "headquarters");
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
