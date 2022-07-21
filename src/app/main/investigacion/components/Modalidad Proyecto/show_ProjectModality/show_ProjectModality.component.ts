import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import {  PrimeNGConfig } from 'primeng/api';

import { ProjectModalityI } from 'src/app/models/projet/projet';
import { ProjectModalityService } from 'src/app/core/services/Procedimientos/ProjectModality.service';

@Component({
  selector: 'app-show_ProjectModality',
  templateUrl: './show_ProjectModality.component.html',
  styleUrls: ['./show_ProjectModality.component.css']
})
export class Show_ProjectModalityComponent implements OnInit {


  public projectModalitys:ProjectModalityI[]=[]
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];
  private rows2:ProjectModalityI[] = []
  exportColumns: any[]=[];
  selectedProducts: ProjectModalityI[]=[]; 
  constructor(
    private projectModalityService:ProjectModalityService,
    
    private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }

    ngOnInit(): void {
      this.primengConfig.ripple = true;
        this.loading = false;
        this.cols = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Nombre' },
      ];
      this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
      this.getUsrRoles()
    }

    getUsrRoles() {
      this.projectModalityService.getList().subscribe((rolesFromApi) => {
        this.projectModalitys =rolesFromApi.projectModalitys
       
        this.rows2=[]
        if(rolesFromApi.projectModalitys != undefined){
          for (const key of rolesFromApi.projectModalitys) {
            // if(rolesFromApi.roleInvestigations[0].Users){
              this.rows2.push(
                {
                  id:key.id,
                  name: key.name,
                  // Users:key.Users
                }
              )
            // }
  
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
      if(this.selectedProducts.length > 0){
        for (const key of this.selectedProducts) {
          array.push({ 
            id: key.id,
            Nombre:key.name,
          })
        }
      }else{
      for (const key of this.projectModalitys) {
        array.push({ 
          id: key.id,
          Nombre:key.name,
        })
      }
    }
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(array);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "projectModalitys");
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
          }
        }]
  
      
        var body = [];
        // var body2 = [];
        for (var key in headers){
            if (headers.hasOwnProperty(key)){
                var header = headers[key];
                var row:any[] = [ 
                  header.fila_0.col_1,header.fila_0.col_2
                ]
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
                  data.name.toString()
                ]
                body.push(row);
                
            }
          }
        }else{
        for (var key in this.rows2) {
            if (this.rows2.hasOwnProperty(key))
            {
                var data = this.rows2[key];
                var row:any[] = [
                  data.id?.toString(),
                  data.name.toString()
                ]
                body.push(row);
                
            }
        }
      }
      
        const pdfDefinition: any = {
          // pageOrientation: 'landscape',
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
                  text: `Todas Las Modalidades de Proyectos`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
                }
              ],
      
              columnGap: 10,
      
            },
            {
              style: 'tableExample',
              table: {
                headerRows: 1,
                // widths: [ '3%', '15%', '15%', '15%', '10%', '12%', '10%', '10%'],
                widths: ['50%', '50%'],
      
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
