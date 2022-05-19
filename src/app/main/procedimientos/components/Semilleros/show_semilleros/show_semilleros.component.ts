import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import {  PrimeNGConfig } from 'primeng/api';

import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { LineI } from 'src/app/models/projet/line';
import { SeedbedService } from 'src/app/core/services/Procedimientos/Seedbed.service';
import { SeedbedI } from 'src/app/models/institution/seedbed';
import { StudentI } from 'src/app/models/user/student';
import { ProgramService } from 'src/app/core/services/program/program.service';

@Component({
  selector: 'app-show_semilleros',
  templateUrl: './show_semilleros.component.html',
  styleUrls: ['./show_semilleros.component.css']
})
export class Show_semillerosComponent implements OnInit {
 public seedbeds:SeedbedI[]=[]
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];
  private rows2:SeedbedI[] = []
  exportColumns: any[]=[];
  selectedProducts: SeedbedI[]=[];
  private estudiantes:any[]=[]
  constructor(
    private seedbedService:SeedbedService,
    private programService: ProgramService ,

    private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
      this.loading = false;
      this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'creation_date', header: 'Fecha_de_creacion' },
      // { field: 'approval_date', header: 'Fecha_de_aprovacion' },
      { field: 'ObjetivoGeneral', header: 'Objetivo General' },
      // { field: 'thematics', header: 'Tematicas Asociadas' },
      // { field: 'resolution', header: 'Resolución' },
      // { field: 'article', header: 'Articulo' },
      { field: 'Mision', header: 'Mision' },
      { field: 'Vision', header: 'Vision' },
      { field: 'estrategias', header: 'Vision' },
      
      { field: 'Group.name', header: 'Grupo' },
      { field: 'Teacher.User.fullName', header: 'Docente' },
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getUsrRoles()
  }

  getUsrRoles() {
    this.seedbedService.getList().subscribe((rolesFromApi) => {
      this.seedbeds =rolesFromApi.seedbeds
      this.seedbeds.forEach((newH:SeedbedI) => {
          if( newH.HeadquarterProgram?.ProgramId != undefined) {
            this.programService.getItem(newH.HeadquarterProgram?.ProgramId).subscribe((item) => {
              Object.defineProperty( newH, 'Program', {
                value:item.program
                });
            })
          }
        
        
      });
      console.log(this.seedbeds)
      this.rows2=[]
      if(rolesFromApi.seedbeds != undefined){
        for (const key of rolesFromApi.seedbeds) {

      
            this.rows2.push(
              {
                id:key.id,
                creation_date: key.creation_date,
                // approval_date:key.approval_date,
                name: key.name,
                TeacherId: key.TeacherId,
                ObjetivoGeneral: key.ObjetivoGeneral,
                ObjetivosEspecificos: key.ObjetivosEspecificos,
                Mision: key.Mision,
                Vision: key.Vision,
                estrategias: key.estrategias,
                // resolution:key.resolution,                
                HeadquarterProgramId: key.HeadquarterProgramId,
                GroupId: key.GroupId,
                // article:key.article,                
                Teacher:key.Teacher,
                SeedbedStudent:key.SeedbedStudent,
                Students:key.Students,
                Group:key.Group,
                SeedbedStudents:key.SeedbedStudents,
                HeadquarterProgram:key.HeadquarterProgram
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
    for (const key of this.seedbeds) {
      array.push({ 
        id:key.id,
        Fecha_de_creacion: key.creation_date,
        // Fecha_de_aprovacion:key.approval_date,
        Nombre: key.name,
        Objetivo_General: key.ObjetivoGeneral,
        Objetivos_Especificos: key.ObjetivosEspecificos,
        Mision: key.Mision,
        Vision: key.Vision,
        Estrategias: key.estrategias,
        // Resolucion:key.resolution,  
        // Articulo:key.article,    
        Docente:key.Teacher?.User?.fullName,     
        Grupo:key.Group?.name,                     
        // HeadquarterProgramId: key.HeadquarterProgramId,
        // GroupId: key.GroupId,
        
        // SeedbedStudent:key.SeedbedStudent,
        // Students:key.Students,
        
        // Programa:key.HeadquarterProgram?.Programs?.[0].name
      })
    }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "semilleros");
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
            col_1:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 7 , },
            col_2:{ text: 'CREACIÓN', style: 'tableHeader',fontSize: 7 , },
            // col_3:{ text: 'APROBACIÓN', style: 'tableHeader',fontSize: 7 , },
            col_5:{ text: 'OBJETIVO GENERAL', style: 'tableHeader',fontSize: 7 , },
            col_6:{ text: 'OBJETIVOS ESPECIFICOS', style: 'tableHeader',fontSize: 7 , },
            col_7:{ text: 'MISION', style: 'tableHeader',fontSize: 7 , },
            col_8:{ text: 'VISION', style: 'tableHeader',fontSize: 7 , },
            col_9:{ text: 'ESTRATEGIAS', style: 'tableHeader',fontSize: 7 , },
            // col_10:{ text: 'RESOLUCION', style: 'tableHeader',fontSize: 7 , },
            // col_11:{ text: 'ARTICULO', style: 'tableHeader',fontSize: 7 , },
            col_12:{ text: 'DOCENTE', style: 'tableHeader',fontSize: 7 , },
            col_13:{ text: 'GRUPO', style: 'tableHeader',fontSize: 7 , },
        }
      }]

      
      // var headers2 = [{
      //   fila_0:{
      //       col_1:{ text: 'ID', style: 'tableHeader',fontSize: 12 ,bold: true, },
      //       col_2:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
      //       col_3:{ text: 'IDENTIFICACIÓN', style: 'tableHeader',fontSize: 12 ,bold: true, },
      //       col_5:{ text: 'TELEFONO', style: 'tableHeader',fontSize: 12 ,bold: true, },
      //       col_6:{ text: 'CORREO', style: 'tableHeader',fontSize: 12 ,bold: true, },
      //       col_7:{ text: 'ESTADO', style: 'tableHeader',fontSize: 12 ,bold: true, },
      //   }
      // }]

      // <td>{{order.User.Person.name | titlecase}} {{order.User.Person.surname | titlecase}}</td> 
      //                     <td>{{order.User.Person.identification }} </td> 
      //                     <td>{{order.User.Person.phone }} </td> 
      //                     <td>{{order.User.email }} </td> 
      //                     <td>{{order.status_seedbed  | titlecase}} </td> 
    
      var body = [];
      // var body2 = [];
      // var body2 = [];
      for (var key in headers){
          if (headers.hasOwnProperty(key)){
              var headerU = headers[key];
              var row:any[] = [ 
                headerU.fila_0.col_1,
                headerU.fila_0.col_2,
              // headerU.fila_0.col_3,
              headerU.fila_0.col_5,
              headerU.fila_0.col_6,
              headerU.fila_0.col_7,
              headerU.fila_0.col_8,
              headerU.fila_0.col_9,
              // headerU.fila_0.col_10,
              // headerU.fila_0.col_11,
              headerU.fila_0.col_12,
              headerU.fila_0.col_13,
              ]
              body.push(row);
          }
      }

      
      for (var key in this.rows2) {
        if (this.rows2.hasOwnProperty(key))
        {
            var data = this.rows2[key];
            var row:any[] = [
              data.name.toString(),
              data.creation_date.toString(),
      // data.approval_date?.toString(),
      
      data.ObjetivoGeneral.toString(),
      data.ObjetivosEspecificos.toString(),
      data.Mision.toString(),
      data.Vision.toString(),
      data.estrategias.toString(),
  //    data.resolution?.toString(),  
  //  data.article?.toString(),    
     data.Teacher?.User?.fullName.toString(),     
     data.Group?.name.toString(), 
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
                text: `Todos Los Semilleros de Investigación`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
              }
            ],
    
            columnGap: 10,
    
          },
          {
            style: 'tableExample',
            fontSize: 7,
            table: {
              headerRows: 1,
              widths: [ '17%', '7%', '16%','15%','5%','5%','10%','10%','15%'],
             
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
