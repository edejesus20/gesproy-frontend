import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import {  PrimeNGConfig } from 'primeng/api';

import { RoleInvestigationsService } from 'src/app/core/services/institution/roleInvestigations.service';
import { GroupInvestigatorCollaboratorI, GroupStudentI, RoleInvestigationI } from 'src/app/models/institution/roles_investigation';
import { StudentService } from 'src/app/core/services/usuer/Student.service';
import { InvestigadorColaboladorService } from 'src/app/core/services/usuer/InvestigadorColabolador.service';
import { TeacherService } from 'src/app/core/services/usuer/Teacher.service';
import { LineProgramGroupTeacherI } from 'src/app/models/institution/program';

@Component({
  selector: 'app-show-rol-investigation',
  templateUrl: './show-rol-investigation.component.html',
  styleUrls: ['./show-rol-investigation.component.css']
})
export class ShowRolInvestigationComponent implements OnInit {
  public roles:RoleInvestigationI[]=[]
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];
  private rows2:RoleInvestigationI[] = []
  exportColumns: any[]=[];
  selectedProducts: RoleInvestigationI[]=[]; 
  constructor(
    private roleInvestigationsService:RoleInvestigationsService,
    private studentService:StudentService,
    private teacherService:TeacherService,
    private investigadorColaboladorService:InvestigadorColaboladorService,
    
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
      this.roleInvestigationsService.getList().subscribe((rolesFromApi) => {
        this.roles =rolesFromApi.roleInvestigations

        let arrayTeacher:any | null=null
        let arrayStudiante:any | null=null
        let arrayColabolador:any | null=null
        for (let key of this.roles) {
          if(key.LineProgramGroupTeachers != undefined && key.LineProgramGroupTeachers.length > 0) {
            key.LineProgramGroupTeachers.forEach((newH:LineProgramGroupTeacherI) => {
              if( newH?.TeacherId != undefined) {
                this.teacherService.getItem(newH.TeacherId).subscribe((item) => {
                  arrayTeacher=item.teacher.User
                  if(key.Users!= undefined) {
                    key.Users.push(arrayTeacher)
      
                  }else{
                    Object.defineProperty( key, 'Users', {
                      value:[arrayTeacher]
                      });
                  }
                })
                
              }
          });
          }

          if(key.GroupStudents != undefined && key.GroupStudents.length > 0) {
            key.GroupStudents.forEach((newH:GroupStudentI) => {
              if( newH?.StudentId != undefined) {
                this.studentService.getItem(newH.StudentId).subscribe((item) => {
                  arrayStudiante=item.student.User
                  if(key.Users!= undefined) {
                    key.Users.push(arrayStudiante)
      
                  }else{
                  Object.defineProperty( key, 'Users', {
                    value:[arrayStudiante]
                    });
                  }
                })
                
              }
          });
          }
          if(key.GroupInvestigatorCollaborators != undefined && key.GroupInvestigatorCollaborators.length > 0) {
            key.GroupInvestigatorCollaborators.forEach((newH:GroupInvestigatorCollaboratorI) => {
              if( newH?.InvestigatorCollaboratorId != undefined) {
                this.investigadorColaboladorService.getItem(newH.InvestigatorCollaboratorId).subscribe((item) => {
                  arrayColabolador=item.investigatorCollaborator.User
                  if(key.Users != undefined) {
                    key.Users.push(arrayColabolador)
      
                  }else{
                  Object.defineProperty( key, 'Users', {
                    value:[arrayColabolador]
                    });
                  }
                })
               
              }
          });
          }

        }
        // console.log(this.roles)
        this.rows2=[]
        if(rolesFromApi.roleInvestigations != undefined){
          for (const key of rolesFromApi.roleInvestigations) {
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
      for (const key of this.roles) {
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
          this.saveAsExcelFile(excelBuffer, "roles_investigations");
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
                  text: `Todos Los Roles de Investigacion`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
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
