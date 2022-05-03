import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';

import { CategoryService } from 'src/app/core/services/institution/category.service';
import { CategoryI } from 'src/app/models/institution/category';

@Component({
  selector: 'app-show_Category',
  templateUrl: './show_Category.component.html',
  styleUrls: ['./show_Category.component.css']
})
export class Show_CategoryComponent implements OnInit {
  public categorys:CategoryI[] = []
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];

  private rows2:CategoryI[] = []

  exportColumns: any[]=[];
  selectedProducts: CategoryI[]=[];
  constructor(
    private categoryService:CategoryService,
    private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }

    ngOnInit(): void {
      this.primengConfig.ripple = true;
      this.loading = false;
      this.cols = [
        { field: 'id', header: 'ID' },
        { field: 'name', header: 'Nombre' },
        // { field: 'Group.name', header: 'Grupo' },
        { field: 'date', header: 'Fecha' }
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
      this.getAllScale() 
  } 
   
  getAllScale() {
    this.categoryService.getList().subscribe((categoryGroupsApiFrom) => {
      this.categorys =categoryGroupsApiFrom.categorys
      console.log(categoryGroupsApiFrom.categorys)
      this.rows2=[]
      if(categoryGroupsApiFrom.categorys != undefined){
        for (const key of categoryGroupsApiFrom.categorys) {
          this.rows2.push(
            {
              id:key.id,
              name:  key.name,
              // date:  key.date,
              // GroupId:key.GroupId,
              // Groups: key.Groups,
            }
          )
        }
      }
    }, error => console.error(error));
  }
  Buscar(event: Event, dt1:any){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
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
    for (const key of this.categorys) {
      array.push({ 
        id: key.id,
        Nombre_Completo:key.name,
        // Grupo:key.Group?.name,
      })
      }
    }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "categorys");
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
          // col_3:{ text: 'FECHA', style: 'tableHeader',fontSize: 12 ,bold: true, },
          // col_4:{ text: 'GRUPO', style: 'tableHeader',fontSize: 12 ,bold: true, },
      }
    }]
  
    var body = [];
    for (var key in headers){
        if (headers.hasOwnProperty(key)){
            var header = headers[key];
            var row:any[] = [ header.fila_0.col_1,header.fila_0.col_2,
              // header.fila_0.col_3,
              // header.fila_0.col_4
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
              data.name.toString(),
              // data.date.toString(),
              // data.Group?.name.toString()
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
              // data.date.toString(),
              // data.Group?.name.toString()
            ]
  
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
              text: `Categoria de Programas`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
            }
          ],
  
          columnGap: 10,
  
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
              widths: [ '50%', '50%'],
  
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
