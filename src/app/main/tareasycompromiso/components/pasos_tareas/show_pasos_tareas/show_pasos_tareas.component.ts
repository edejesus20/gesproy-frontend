import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import { Productivity_typesService } from 'src/app/core/services/productivity/productivity_types.service';
import { ProductivityTypeI } from 'src/app/models/productivity/productivity_types';
import { Productivity_stepService } from 'src/app/core/services/productivity/productivity_step.service';
import { ProductivityStepI } from 'src/app/models/productivity/productivity_step';
@Component({
  selector: 'app-show_pasos_tareas',
  templateUrl: './show_pasos_tareas.component.html',
  styleUrls: ['./show_pasos_tareas.component.css']
})
export class Show_pasos_tareasComponent implements OnInit {

  public productivityTypes:ProductivityTypeI[]=[]
  public productivitySteps:ProductivityStepI[]=[]

  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];

  public rows2:any[] = []
  private rows3:ProductivityStepI[] = []

  exportColumns: any[]=[];
  selectedProducts: ProductivityTypeI[]=[];
  selectedProducts1: ProductivityStepI[]=[];
  
  constructor(
    private productivity_typesService:Productivity_typesService,
    private productivity_stepService:Productivity_stepService,
    private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }
 
   ngOnInit(): void {
     this.primengConfig.ripple = true;
     this.loading = false;
     this.cols = [
       { field: 'id', header: 'ID' },
       { field: 'name', header: 'Nombre' },
       { field: 'description', header: 'Descripción' },
       { field: 'responsable', header: 'Responsable' },
       { field: 'Tipo de Tarea', header: 'ProductivityType.name' },
       
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
    this.productivity_typesService.getList().subscribe(data => {
      this.productivityTypes=data.productivityTypes
      this.rows2=[]
      if(data.productivityTypes != undefined){
        for (const key of data.productivityTypes) {
          if(key.ProductivitySteps != undefined && key.ProductivitySteps?.length > 0){
            // console.log('aqui')
            this.rows2.push(
              {
                id:key.id,
                name:  key.name,
                createdAt:key.createdAt,
                ProductivitySteps:key.ProductivitySteps,
                disabled:false
              }
            )
          }else{
            this.rows2.push(
              {
                id:key.id,
                name:  key.name,
                createdAt:key.createdAt,
                ProductivitySteps:key.ProductivitySteps,
                disabled:true
              }
            )
          }
         
        }
      }
      this.productivity_stepService.getList().subscribe(data => {
        this.productivitySteps=data.productivitySteps
        this.rows3=[]
        if(data.productivitySteps != undefined){
          for (const key of data.productivitySteps) {
            this.rows3.push(
              {
                id:key.id,
                name:  key.name,
                description:key.description,
                responsable:key.responsable,
                level:key.level,
                ProductivityTypeId:key.ProductivityTypeId,
                ProductivityType:key.ProductivityType
              }
            )
          }
        }
      })
    }, error => console.error(error))
  }

  exportExcel() {
    let array:any[] = [];
    for (const key of this.productivitySteps) {
      array.push({ 
        id: key.id,
        Nombre_Completo:key.name,
        Descripción:key.description,
        Responsable:key.responsable,
        Tipo_de_Tarea:key.ProductivityType?.name
      })
    }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "PasosProductividad");
    });
  }
  exportExcelOne(numero:number | undefined,name:string,e:Event) {
    e.preventDefault();
    let array:any[] = [];
    if(numero != undefined){
      console.log(this.productivitySteps)
      for (let key of this.productivitySteps) {
        if(key.id != undefined && key.ProductivityTypeId == numero ){
          array.push({ 
            id: key.id,
            Nombre_Completo:key.name,
            Descripción:key.description,
            Responsable:key.responsable,
            Tipo_de_Tarea:key.ProductivityType?.name
          })
        }
      }
    }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, `Pasostareas${name}`);
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


  async gerenratePdf(){
    const DATA = <HTMLDivElement> document.getElementById('todo');

    var headers = [{
      fila_0:{
          col_1:{ text: 'ID', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_2:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_3:{ text: 'DESCRIPCIÓN', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_4:{ text: 'RESPONSABLE', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_5:{ text: 'TIPO DE PRODUCTIVIDAD', style: 'tableHeader',fontSize: 12 ,bold: true, },
      }
    }]
  
    var body = [];
    for (var key in headers){
        if (headers.hasOwnProperty(key)){
            var header = headers[key];
            var row1:any[] = [ 
              header.fila_0.col_1,header.fila_0.col_2,
              header.fila_0.col_3,header.fila_0.col_4,
              header.fila_0.col_5
            ]
            body.push(row1);
        }
    }
    for (var key in this.rows3) 
    {
        if (this.rows3.hasOwnProperty(key))
        {
            var data = this.rows3[key];
            var row2:any[] = [
              data.id?.toString(),
              data.name.toString(),
              data.description.toString(),
              data.responsable.toString(),
              data.ProductivityType?.name?.toString(),
            ]
  
            body.push(row2);
        }
    }
  
    const pdfDefinition: any = {
  
      // footer: {
      //   columns: [ ]
      // },
      pageOrientation: 'landscape',
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
              text: `Todos los Pasos de las Tareas`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
            }
          ],
  
          columnGap: 10,
  
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
              widths: [ '4%', '20%','40%','20%','16%'],
  
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

  async gerenratePdfOne(numero:number | undefined,name:string,e:Event){
    e.preventDefault();
    const DATA = <HTMLDivElement> document.getElementById('todo');

    var headers = [{
      fila_0:{
          col_1:{ text: 'ID', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_2:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_3:{ text: 'DESCRIPCIÓN', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_4:{ text: 'RESPONSABLE', style: 'tableHeader',fontSize: 12 ,bold: true, },
          // col_5:{ text: 'TIPO DE PRODUCTIVIDAD', style: 'tableHeader',fontSize: 12 ,bold: true, },
      }
    }]
  
    var body = [];
    
    for (var key in headers){
        if (headers.hasOwnProperty(key)){
            var header = headers[key];
            var row1:any[] = [ 
              header.fila_0.col_1,header.fila_0.col_2,
              header.fila_0.col_3,header.fila_0.col_4,
              // header.fila_0.col_5
            ]
            body.push(row1);
        }
    }
   
    if(numero != undefined){
      console.log(this.productivitySteps)
      for (let key of this.productivitySteps) {
        if(key.id != undefined && key.ProductivityTypeId == numero ){
          var row2:any[] = [
            key.id.toString(),
            key.name.toString(),
            key.description.toString(),
            key.responsable.toString(),
            // key.ProductivityType?.name?.toString(),
          ]
          body.push(row2);
        }
      }
    }
   
  
    const pdfDefinition: any = {
  
      // footer: {
      //   columns: [ ]
      // },
      pageOrientation: 'landscape',
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
              text: `Pasos de Productividad de ${name}`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
            }
          ],
  
          columnGap: 10,
  
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
              widths: [ '4%', '26%','40%','30%'],
  
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

}
