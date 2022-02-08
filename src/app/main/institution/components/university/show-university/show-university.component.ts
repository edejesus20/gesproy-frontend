
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { UniversityI } from 'src/app/models/institution/university';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';

@Component({
  selector: 'app-show-university',
  templateUrl: './show-university.component.html',
  styleUrls: ['./show-university.component.scss']
})
export class ShowUniversityComponent implements OnInit {

  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  public universitys:UniversityI[]=[];
  first = 0;
  loading: boolean = true;
 
  rows = 1;
  cols: any[]=[];

  private rows2:UniversityI[] = []

  exportColumns: any[]=[];
  selectedProducts: UniversityI[]=[];
  constructor(
    private universityService: UniversityService,
    private primengConfig: PrimeNGConfig,
    ) { 
      (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs
    }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loading = false;
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'nit', header: 'Nit' },
      { field: 'addres', header: 'Dirreccion' },
      { field: 'createdAt', header: 'Fecha' }
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getUniversitys()
  }

  getUniversitys() {
    this.universityService.getList().subscribe((instititionsFromApi) => {
      this.universitys =instititionsFromApi.universitys;
      this.rows2=[]
      if(instititionsFromApi.universitys != undefined){
        for (const key of instititionsFromApi.universitys) {
          if( key.createdAt)
          this.rows2.push(
            {
              name: key.name,
              nit:  key.nit,
              addres:  key.addres,
              createdAt:  key.createdAt
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
  for (const key of this.universitys) {
    array.push({ 
      id: key.id,
      Nombre_Completo:key.name,
      Nit:key.nit,
      Direccion:key.addres,
    })
  }
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(array);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "universitys");
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

async gerenratePdf(){
  const DATA = <HTMLDivElement> document.getElementById('todo');
  var headers = [{
    fila_0:{
        col_1:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
        col_2:{ text: 'NIT', style: 'tableHeader',fontSize: 12 ,bold: true, },
        col_3:{ text: 'DIRECCION', style: 'tableHeader',fontSize: 12 ,bold: true, },
        col_4:{ text: 'FECHA', style: 'tableHeader',fontSize: 12 ,bold: true, }
    }
  }]

  var body = [];
  for (var key in headers){
      if (headers.hasOwnProperty(key)){
          var header = headers[key];
          var row:any[] = [ header.fila_0.col_1,header.fila_0.col_2,header.fila_0.col_3,header.fila_0.col_4]
          body.push(row);
      }
  }
  for (var key in this.rows2) 
  {
      if (this.rows2.hasOwnProperty(key))
      {
          var data = this.rows2[key];
          var row:any[] = [data.name.toString(),data.nit.toString(),data.addres.toString(),data.createdAt?.toString()]

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
            text: `Universidades`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
          }
        ],

        columnGap: 10,

      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
            widths: [ '35%', '15%','25%','25%'],

            body: body
        },
        layout: 'headerLineOnly',
        margin: [ 15, 0, 0, 15 ]
    },  
    // {
    //   columns: [
    //     { text: `NELSON FIGUEROA LOPÉZ
    //     DIRECTOR EJECUTIVO`, alignment: 'center' , fontSize: 15 ,bold: true,margin: [ 0, 20, 0, 0 ]
    //     },
    //     { text: `MARIA SALINAS A.
    //     CONTADOR PUBLICO
    //     TP. N. 98003-T`, alignment: 'center' , fontSize: 15 ,bold: true,margin: [ 0, 20, 0, 0 ]
    //      }
    //   ],
    //   // optional space between columns
    //   columnGap: 10,

    // },
      
    ]

  }

  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();
}


editar(id: number){
  this.modificar.emit(id)
  // this.router.navigateByUrl(`/contabilidad/account_modificar/${id}`);
}

delet(id: number){
  this.modificar.emit(id)
  // this.router.navigateByUrl(`/contabilidad/account_eliminar/${id}`);
}
detalle(id: number){
  this.modificar.emit(id)
  // this.router.navigateByUrl(`/contabilidad/account/${id}`);
}

}
