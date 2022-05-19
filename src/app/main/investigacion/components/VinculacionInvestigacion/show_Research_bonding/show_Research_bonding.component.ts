import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import { Research_bondingI } from 'src/app/models/institution/charge_bonding';
import { Research_bondingService } from 'src/app/core/services/investigacion/Research_bonding.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { HeadquarterProgramTeacherI } from 'src/app/models/institution/headquarter';

@Component({
  selector: 'app-show_Research_bonding',
  templateUrl: './show_Research_bonding.component.html',
  styleUrls: ['./show_Research_bonding.component.css']
})
export class Show_Research_bondingComponent implements OnInit {
  public research_bondings: Research_bondingI[]=[];
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];

  private rows2:Research_bondingI[] = []

  exportColumns: any[]=[];
  selectedProducts: Research_bondingI[]=[];

  constructor(
    private research_bondingService:Research_bondingService ,
    // private teacherService:TeacherService ,
     private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }
 
   ngOnInit(): void {
     this.primengConfig.ripple = true;
     this.loading = false;
     this.cols = [
       { field: 'id', header: 'ID' },
       { field: 'name', header: 'Nombre' },
       { field: 'createdAt', header: 'Fecha' }
       
   ];
   
   this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getAllScale() 
  }
 
  Buscar(event: Event, dt1:any){
    event.preventDefault();
    
      const filterValue = (event.target as HTMLInputElement).value;
      dt1.filterGlobal(filterValue, 'contains')
  }
  getAllScale() {
    
    this.research_bondingService.getList().subscribe((research_bondingsApiFrom) => {
      this.research_bondings =research_bondingsApiFrom.research_bondings

    
      console.log(this.research_bondings)
      this.rows2=[]
      if(research_bondingsApiFrom.research_bondings != undefined){
        for (const key of research_bondingsApiFrom.research_bondings) {
          this.rows2.push(
            {
              id:key.id,
              name:  key.name,
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
          col_1:{ text: 'ID', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_2:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_3:{ text: 'FECHA', style: 'tableHeader',fontSize: 12 ,bold: true, },
      }
    }]
  
    var body = [];
    for (var key in headers){
        if (headers.hasOwnProperty(key)){
            var header = headers[key];
            var row:any[] = [ header.fila_0.col_1,header.fila_0.col_2,
              header.fila_0.col_3]
            body.push(row);
        }
    }

    if(this.selectedProducts.length > 0){
      for (const key in this.selectedProducts) {
        if (this.selectedProducts.hasOwnProperty(key))
        {
            var data = this.selectedProducts[key];
            var row:any[] = [
              data.id?.toString(),
              data.name.toString(),
              data.createdAt?.toString()
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
            var row:any[] = [
              data.id?.toString(),
              data.name.toString(),
              data.createdAt?.toString()]
  
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
              text: `Vinculaciones Investigativas`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
            }
          ],
  
          columnGap: 10,
  
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
              widths: [ '33%', '34%','33%'],
  
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
        })
      }
    }else{
    for (const key of this.research_bondings) {
      array.push({ 
        id: key.id,
        Nombre_Completo:key.name,
      })
    }
  }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "research_bondings");
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
