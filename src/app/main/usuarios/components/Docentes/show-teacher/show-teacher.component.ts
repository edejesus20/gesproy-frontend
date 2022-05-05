import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { TeacherI } from 'src/app/models/user/teacher';
import { SeedbedI } from 'src/app/models/institution/seedbed';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';

@Component({
  selector: 'app-show-teacher',
  templateUrl: './show-teacher.component.html',
  styleUrls: ['./show-teacher.component.css']
})
export class ShowTeacherComponent implements OnInit {
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  public teachers:any[]=[];
  first = 0;
  loading: boolean = true;
 
  rows = 1;
  cols: any[]=[];

  private rows2:TeacherI[] = []

  exportColumns: any[]=[];
  selectedProducts: TeacherI[]=[];
  constructor(
    private teacherService:TeacherService,
    private lineService:LineService,
    private primengConfig: PrimeNGConfig,
    ) { 
      (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs
    }

    ngOnInit(): void {
      this.primengConfig.ripple = true;
      this.loading = false;
      this.cols = [
        { field: 'id', header: 'ID' },
        { field: 'User.fullName', header: 'Nombre Completo' },
        { field: 'User.Person.identification', header: 'Identificacion' },
        { field: 'User.email', header: 'Correo Electronico' },
        { field: 'User.Person.phone', header: 'Telefono' },
        { field: 'hours_of_dedication', header: 'Horas de dedicación' },
        { field: 'Scale.name', header: 'Escalafon' },
        { field: 'ColcienciaCategory.name', header: 'Categoria de Colciencia' }
    ];
  
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
      this.getUniversitys()
    }
  
   
  
    getUniversitys() {
      this.teacherService.getList().subscribe((instititionsFromApi) => {
        this.teachers =instititionsFromApi.teachers;

        let arrayLinea:any[] = [];
        for (const newH of  this.teachers) {
          this.lineService.AddTeacherLines(newH.id).subscribe((item) => {
            if(item.lines != undefined && item.lines.length > 0){
              for (const line of item.lines ) {
                arrayLinea.push({line,tipo:'Grupo'})
              }
              
            }
            if(item.lines2 != undefined && item.lines2.length > 0){
              for (const line of item.lines2 ) {
                arrayLinea.push({line,tipo:'Semillero'})
              }
              
            }
            

      })
      if( newH.id != undefined && (newH.Seedbeds != undefined && newH.Seedbeds.length > 0)||(newH.Groups != undefined && newH.Groups.length > 0)) {

        Object.defineProperty( newH, 'Lines', {
          value:arrayLinea
          });

    }
        }
      //   this.teachers.forEach((newH:TeacherI) => {
      //     if( newH.id != undefined && newH.Seedbeds != []) {

      //         Object.defineProperty( newH, 'Lines', {
      //           value:arrayLinea
      //           });

      //     }
        
        
      // });

        // console.log(instititionsFromApi.teachers)
        this.rows2=[]
        if(instititionsFromApi.teachers != undefined){
          for (let key of instititionsFromApi.teachers) {
            this.rows2.push(
              {
                id: key.id,
                UserId: key.UserId,
                ScaleId: key.ScaleId,
                ColcienciaCategoryId: key.ColcienciaCategoryId,
                User:key.User,
                Scale:key.Scale,
                Groups:key.Groups,
                ColcienciaCategory:key.ColcienciaCategory,
                TrainingTeacher:key.TrainingTeacher,
                hours_of_dedication:key.hours_of_dedication,
                LinkTypeId:key.LinkTypeId
              }
            )


          }
          // console.log(this.teachers)
        
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
        Nombre_Completo:key.User?.fullName,
        Identificacion:key.User?.Person?.identification,
        Correo_Electronico:key.User?.email,
        Telefono:key.User?.Person?.phone,
        Horas_de_dedicación:key.hours_of_dedication,
        Escalafon:key.Scale?.name,
        Categoria_de_Colciencia:key.ColcienciaCategory?.name
      })
    }
  }else{
  for (const key of this.teachers) {
    array.push({ 
      id: key.id,
      Nombre_Completo:key.User?.fullName,
      Identificacion:key.User?.Person?.identification,
      Correo_Electronico:key.User?.email,
      Telefono:key.User?.Person?.phone,
      Horas_de_dedicación:key.hours_of_dedication,
      Escalafon:key.Scale?.name,
      Categoria_de_Colciencia:key.ColcienciaCategory?.name
    })
  }
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
          col_5:{ text: 'HORAS DE DEDICACIÓN', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_6:{ text: 'ESCALAFON', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_7:{ text: 'CATEGORIA COLCIENCIAS', style: 'tableHeader',fontSize: 12 ,bold: true, }
      }
    }]
  
    var body = [];
    for (var key in headers){
        if (headers.hasOwnProperty(key)){
            var header = headers[key];
            var row:any[] = [ header.fila_0.col_1,header.fila_0.col_2,header.fila_0.col_3,
              header.fila_0.col_4,
              header.fila_0.col_5,
              header.fila_0.col_6,header.fila_0.col_7
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
              data.User?.Person?.identification.toString(),
              data.User?.fullName.toString(),
              data.User?.email.toString(),
              data.User?.Person?.phone?.toString(),
              data.hours_of_dedication.toString(),
              data.Scale?.name.toString(),
              data.ColcienciaCategory?.name?.toString()
          
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
              data.User?.Person?.identification.toString(),
              data.User?.fullName.toString(),
              data.User?.email.toString(),
              data.User?.Person?.phone?.toString(),
              data.hours_of_dedication.toString(),
              data.Scale?.name.toString(),
              data.ColcienciaCategory?.name?.toString()
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
              text: `Profesores`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
            }
          ],
  
          columnGap: 10,
  
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
              widths: [ '15%', '15%','15%','15%','15%','10%','10%'],
  
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
