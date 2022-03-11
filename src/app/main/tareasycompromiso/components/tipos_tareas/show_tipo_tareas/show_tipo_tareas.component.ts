import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import { Productivity_typesService } from 'src/app/core/services/productivity/productivity_types.service';
import { ProductivityTypeI } from 'src/app/models/productivity/productivity_types';

@Component({
  selector: 'app-show_tipo_tareas',
  templateUrl: './show_tipo_tareas.component.html',
  styleUrls: ['./show_tipo_tareas.component.css']
})
export class Show_tipo_tareasComponent implements OnInit {
  public productivityTypes:ProductivityTypeI[]=[]

  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];

  private rows2:ProductivityTypeI[] = []

  exportColumns: any[]=[];
  selectedProducts: ProductivityTypeI[]=[];
  
  constructor(
    private productivity_typesService:Productivity_typesService,
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
    this.productivity_typesService.getList().subscribe(data => {
      this.productivityTypes=data.productivityTypes
      this.rows2=[]
      if(data.productivityTypes != undefined){
        for (const key of data.productivityTypes) {
          this.rows2.push(
            {
              id:key.id,
              name:  key.name,
              createdAt:key.createdAt
            }
          )
        }
      }
    }, error => console.error(error))
  }

  exportExcel() {
    let array:any[] = [];
    for (const key of this.productivityTypes) {
      array.push({ 
        id: key.id,
        Nombre_Completo:key.name,
      })
    }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "TipoProductividad");
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
  
    const pdfDefinition: any = {
  
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
              text: `Tipos de Productividad`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
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


}
