import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import {  PrimeNGConfig } from 'primeng/api';
import { NotificationService } from 'src/app/core/services/dashboard/Notification.service';
import { NotificationI } from 'src/app/models/desk/notifications';

@Component({
  selector: 'app-show_notification',
  templateUrl: './show_notification.component.html',
  styleUrls: ['./show_notification.component.css']
})
export class Show_notificationComponent implements OnInit {


  public notifications:NotificationI[]=[]
  
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];

  private rows2:NotificationI[] = []

  exportColumns: any[]=[];
  selectedProducts: NotificationI[]=[];
  constructor(
    private notificationService:NotificationService,
    private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }

    ngOnInit(): void {
      this.primengConfig.ripple = true;
      this.loading = false;
      this.cols = [
        { field: 'id', header: 'ID' },
        { field: 'date_firt', header: 'Fecha Publicada' },
        { field: 'date_end', header: 'Fecha de Vencimiento' },
        { field: 'title', header: 'Titulo' },
        { field: 'description', header: 'Descripcion' },
        { field: 'abstract', header: 'Resumen' },
        
        { field: 'User.fullName', header: 'Publicado por' },
        { field: 'status_notification', header: 'Estado' },
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
      this.getAllScale() 
    }
   
    getAllScale() {
      this.notificationService.getList().subscribe((categoryGroupsApiFrom) => {
        this.notifications =categoryGroupsApiFrom.notifications
        console.log(categoryGroupsApiFrom.notifications)
        this.rows2=[]
        if(categoryGroupsApiFrom.notifications != undefined){
          for (const key of categoryGroupsApiFrom.notifications) {
            this.rows2.push(
              {
                id:key.id,
                date_firt: key.date_firt,
                date_end: key.date_end,
                title: key.title,
                description: key.description,
                UserId: key.UserId,
                status_notification: key.status_notification,
                User:key.User,
                abstract:key.abstract
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
  
    async gerenratePdf(){
      const DATA = <HTMLDivElement> document.getElementById('todo');
      var headers = [{
        fila_0:{
            col_1:{ text: 'Id', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_2:{ text: 'Fecha_publicacion', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_3:{ text: 'Fecha_vencimiento', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_4:{ text: 'Titulo', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_5:{ text: 'Descripcion', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_6:{ text: 'Publicado Por', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_7:{ text: 'Estado', style: 'tableHeader',fontSize: 12 ,bold: true, },
        }
      }]

      var body = [];
      for (var key in headers){
          if (headers.hasOwnProperty(key)){
              var header = headers[key];
              var row:any[] = [ 
                header.fila_0.col_1,
                header.fila_0.col_2,
                header.fila_0.col_3,
                header.fila_0.col_4,
                header.fila_0.col_5,
                header.fila_0.col_6,
                header.fila_0.col_7,
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
                data.date_firt.toString(),
                data.date_end.toString(),
                data.title.toString(),
                data.description.toString(),
                data.User?.fullName.toString(),
                data.status_notification?.toString()
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
                data.date_firt.toString(),
                data.date_end.toString(),
                data.title.toString(),
                data.description.toString(),
                data.User?.fullName.toString(),
                data.status_notification?.toString()
              ]
    
              body.push(row);
          }
      }
    }
    
      const pdfDefinition: any = {
      pageOrientation: 'landscape',
      
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
                text: `Vinculaciones de Cargos`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
              }
            ],
    
            columnGap: 10,
    
          },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
                widths: [ '6%','16%','16%','12%','15%','20%', '15%'],
    
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
             Fecha_publicacion: key.date_firt,
                Fecha_vencimiento: key.date_end,
                Titulo: key.title,
                Descripcion: key.description,
                Publicado_por: key.User?.fullName,
                Estado: key.status_notification,
                Resumen:key.abstract

          })
        }
      }else{
      for (const key of this.notifications) {
        array.push({ 
          id: key.id,
          Fecha_publicacion: key.date_firt,
          Fecha_vencimiento: key.date_end,
          Titulo: key.title,
          Descripcion: key.description,
          Publicado_por: key.User?.fullName,
          Estado: key.status_notification,
          Resumen:key.abstract

        })
      }
    }
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(array);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "notifications");
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
