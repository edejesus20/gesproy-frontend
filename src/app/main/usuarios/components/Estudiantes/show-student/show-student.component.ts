import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import { StudentI } from 'src/app/models/user/student';
import { StudentService } from 'src/app/core/services/usuer/Student.service';
@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent implements OnInit {
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  public students:StudentI[]=[];
  first = 0;
  loading: boolean = true;
 
  rows = 1;
  cols: any[]=[];

  private rows2:any[] = []

  exportColumns: any[]=[];
  selectedProducts: StudentI[]=[];
  constructor(
    private studentService:StudentService,

    private primengConfig: PrimeNGConfig,
    ) { 
      (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs
    }
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.loading = false;
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'User.fullName', header: 'Nombre Completo' },
      { field: 'User.Person.identification', header: 'Identificacion' },
      { field: 'User.email', header: 'Correo Electronico' },
      { field: 'User.Person.phone', header: 'Telefono' },
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getUniversitys()
  }
  
  getUniversitys() {
    this.studentService.getList().subscribe((instititionsFromApi) => {
      this.students =instititionsFromApi.students;
      this.rows2=[]
      if(instititionsFromApi.students != undefined){
        for (const key of instititionsFromApi.students) {
          this.rows2.push(
            {
              UserId: key.UserId,
              User:key.User,
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
    for (const key of this.students) {
      array.push({ 
        id: key.id,
        Nombre_Completo:key.User?.fullName,
        Identificacion:key.User?.Person?.identification,
        Correo_Electronico:key.User?.email,
        Telefono:key.User?.Person?.phone,
      })
    }
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(array);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "teachers");
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
            col_1:{ text: 'IDENTIFICACIÓN', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_2:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_3:{ text: 'CORREO', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_4:{ text: 'TELEFONO', style: 'tableHeader',fontSize: 12 ,bold: true, },
        }
      }]
    
      var body = [];
      for (var key in headers){
          if (headers.hasOwnProperty(key)){
              var header = headers[key];
              var row:any[] = [ header.fila_0.col_1,header.fila_0.col_2,header.fila_0.col_3,
                header.fila_0.col_4
              ]
              body.push(row);
          }
      }
      for (var key in this.rows2) 
      {
          if (this.rows2.hasOwnProperty(key))
          {
              var data = this.rows2[key];
              var row:any[] = [
                data.User?.Person?.identification.toString(),
                data.User?.fullName.toString(),
                data.User?.email.toString(),
                data.User?.Person?.phone?.toString(),
              ]
    
              body.push(row);
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
                text: `Estudiantes`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
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
