import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import {  PrimeNGConfig } from 'primeng/api';

import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { LineI } from 'src/app/models/projet/line';

@Component({
  selector: 'app-show_lines',
  templateUrl: './show_lines.component.html',
  styleUrls: ['./show_lines.component.css']
})
export class Show_linesComponent implements OnInit {
  public lines:LineI[]=[]
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];
  private rows2:LineI[] = []
  exportColumns: any[]=[];
  selectedProducts: LineI[]=[];
  constructor(
    private lineService:LineService,
    private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }
  ngOnInit() {
    this.primengConfig.ripple = true;
      this.loading = false;
      this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'justification', header: 'Justificación' },
      { field: 'objectives', header: 'Objetivos' },
      // { field: 'thematics', header: 'Tematicas Asociadas' },
      // { field: 'resolution', header: 'Resolución' },
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getUsrRoles()
  }
  getUsrRoles() {
    this.lineService.getList().subscribe((rolesFromApi) => {
      this.lines =rolesFromApi.lines
      // console.log(rolesFromApi.lines)
      this.rows2=[]
      if(rolesFromApi.lines != undefined){
        for (const key of rolesFromApi.lines) {
            this.rows2.push(
              {
                id:key.id,
                name: key.name,
                // justification:key.justification,
                // objectives:key.objectives,
                // // thematics:key.thematics,
                // resolution:key.resolution,
              }
            )
          

        }
      }
    }, error => console.error(error));
  }

  Buscar(event: Event, dt1:any){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      dt1.filterGlobal(filterValue, 'contains')
  }
  exportExcel() {
    let array:any[] = [];
    for (const key of this.lines) {
      array.push({ 
        id: key.id,
        Nombre:key.name,
        // Justificación:key.justification,
        // Objetivos:key.objectives,
        // Tematicas_Asociadas:key.thematics,
        // Resolución:key.resolution,
      })
    }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "lineas");
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
            // col_1:{ text: 'ID', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_2:{ text: 'NOMBRE', style: 'tableHeader' ,bold: true, },
            col_3:{ text: 'JUSTIFICACIÓN', style: 'tableHeader' ,bold: true, },
            col_5:{ text: 'OBJETIVOS', style: 'tableHeader' ,bold: true, },
            // col_6:{ text: 'TEMATICAS ASOCIADAS', style: 'tableHeader' ,bold: true, },
            // col_7:{ text: 'RESOLUCION', style: 'tableHeader' ,bold: true, },
        }
      }]

    
      var body = [];
      // var body2 = [];
      for (var key in headers){
          if (headers.hasOwnProperty(key)){
              var headerU = headers[key];
              var row:any[] = [ 
                // headerU.fila_0.col_1,
                headerU.fila_0.col_2,
              headerU.fila_0.col_3,
              headerU.fila_0.col_5,
              // headerU.fila_0.col_6,
              // headerU.fila_0.col_7,
              ]
              body.push(row);
          }
      }
  
      for (var key in this.rows2) {
          if (this.rows2.hasOwnProperty(key))
          {
              var data = this.rows2[key];
              var row:any[] = [
                // data.id?.toString(),
                data.name.toString(),
                // data.justification.toString(),
                // data.objectives.toString(),
                // data.thematics.toString(),
                // data.resolution?.toString()
              ]
              body.push(row);
              
          }
      }
    
      const pdfDefinition: any = {
        pageOrientation: 'landscape',
        // footer: {
        //   columns: [ ]
        // },
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
                text: `Todos Las Lineas de Investigación`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
              }
            ],
    
            columnGap: 10,
    
          },
          {
            style: 'tableExample',
            fontSize: 8,
            table: {
              headerRows: 1,
              widths: [ '30%', '35%', '35%'],
             
                body: body
            },
            layout: 'headerLineOnly',
            margin: [ 0, 0, 0, 0 ]
        }, 
      //   {
      //     style: 'tableExample',
      //     table: {
      //       headerRows: 1,
      //       widths: [ '3%', '15%', '15%', '15%', '10%', '12%', '10%', '10%'],
      //         body: body2
      //     },
      //     layout: 'headerLineOnly',
      //     margin: [ 15, 0, 0, 15 ]
      // }, 
          
        ]
    
      }
    
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    }
}
