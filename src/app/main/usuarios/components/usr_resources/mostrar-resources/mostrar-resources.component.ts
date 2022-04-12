import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import {  PrimeNGConfig } from 'primeng/api';

import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { ResourceI } from 'src/app/models/authorization/usr_resource';

@Component({
  selector: 'app-mostrar-resources',
  templateUrl: './mostrar-resources.component.html',
  styleUrls: ['./mostrar-resources.component.css']
})
export class MostrarResourcesComponent implements OnInit {

  public resources: ResourceI[] = [];
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];
  private rows2:ResourceI[] = []
  exportColumns: any[]=[];
  selectedProducts: ResourceI[]=[];
  constructor(
    private resourcesService: ResourcesService,
    private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loading = false;
    this.cols = [
    { field: 'id', header: 'Id' },
    { field: 'path', header: 'Ruta | Path' },
    { field: 'method', header: 'Metodo' },
    { field: 'icono', header: 'Icono' },
    { field: 'link', header: 'Enlace' },
    { field: 'titulo', header: 'Titulo' },
  ];
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getUsrResource()
  }
  getUsrResource() {
    this.resourcesService.getResource().subscribe((ResourceFromApi) => {
      this.resources = ResourceFromApi.resources
      this.rows2=[]
      if(ResourceFromApi.resources != undefined){
        for (const key of ResourceFromApi.resources) {
          if(ResourceFromApi.resources[0].Roles){
            this.rows2.push(
              {
                id:key.id,
                path: key.path,
                method: key.method,
                id_padre: key.id_padre,
                icono: key.icono,
                link: key.link,
                titulo: key.titulo,
                Roles:key.Roles
              }
            )
          }

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
          col_1:{ text: 'ID', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_2:{ text: 'RUTA | PATH', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_3:{ text: 'METODO', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_4:{ text: 'ID_PADRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_5:{ text: 'ICONO', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_6:{ text: 'ENLACE', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_7:{ text: 'TITULO', style: 'tableHeader',fontSize: 12 ,bold: true, },
//       col_8:{ text: 'GENERO', style: 'tableHeader',fontSize: 12 ,bold: true, },
      }
    }]
  
    var body = [];
    for (var key in headers){
        if (headers.hasOwnProperty(key)){
            var header = headers[key];
            var row:any[] = [ 
              header.fila_0.col_1,header.fila_0.col_2,
              header.fila_0.col_3,header.fila_0.col_4,
              header.fila_0.col_5,header.fila_0.col_6,
              header.fila_0.col_7
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
              data.path.toString(),
              data.method.toString(),
              data.id_padre.toString(),
              data.icono.toString(),
              data.link.toString(),
              data.titulo.toString(),
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
              data.path.toString(),
              data.method.toString(),
              data.id_padre.toString(),
              data.icono.toString(),
              data.link.toString(),
              data.titulo.toString(),
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
              text: `Todos Los Recursos`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
            }
          ],
  
          columnGap: 10,
  
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [ '5%', '15%', '15%', '15%', '15%', '25%', '10%'],
            // widths: ['50%', '50%'],
  
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
          Ruta:key.path,
          Metodo:key.method,
          Icono:key.icono,
          Enlace:key.link,
          Titulo:key.titulo,
        })
      }
    }else{
    for (const key of this.resources) {
      array.push({ 
        id: key.id,
        Ruta:key.path,
        Metodo:key.method,
        Icono:key.icono,
        Enlace:key.link,
        Titulo:key.titulo,
      })
    }
  }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "resources");
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
