import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import {  PrimeNGConfig } from 'primeng/api';

import { Router } from '@angular/router';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';


@Component({
  selector: 'app-mostrar-rols',
  templateUrl: './mostrar-rols.component.html',
  styleUrls: ['./mostrar-rols.component.css']
})
export class MostrarRolsComponent implements OnInit {
  public roles:RoleI[]=[]
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];
  private rows2:RoleI[] = []
  exportColumns: any[]=[];
  selectedProducts: RoleI[]=[]; 
  constructor(
    private rolesService: RolesService,
    private router:Router,
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
    this.rolesService.getRole().subscribe((rolesFromApi) => {
      this.roles =rolesFromApi.roles
      // console.log(rolesFromApi.roles)
      this.rows2=[]
      if(rolesFromApi.roles != undefined){
        for (const key of rolesFromApi.roles) {
          if(rolesFromApi.roles[0].Users){
            this.rows2.push(
              {
                id:key.id,
                name: key.name,
                Users:key.Users
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
          col_2:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
      }
    }]

    // var headersU = [{
    //   fila_0:{
    //       col_1:{ text: 'ID', style: 'tableHeader',fontSize: 12 ,bold: true, },
    //       col_2:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
    //       col_3:{ text: 'APELLIDO', style: 'tableHeader',fontSize: 12 ,bold: true, },
    //       col_4:{ text: 'IDENTIFICACIÓN', style: 'tableHeader',fontSize: 12 ,bold: true, },
    //       col_5:{ text: 'CORREO', style: 'tableHeader',fontSize: 12 ,bold: true, },
    //       col_6:{ text: 'TELEFONO', style: 'tableHeader',fontSize: 12 ,bold: true, },
    //       col_7:{ text: 'DIRECCIÓN', style: 'tableHeader',fontSize: 12 ,bold: true, },
    //       col_8:{ text: 'GENERO', style: 'tableHeader',fontSize: 12 ,bold: true, },
    //   }
    // }]
  
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

  //   for (var key in headersU){
  //     if (headers.hasOwnProperty(key)){
  //         var headerU = headersU[key];
  //         var rowu:any[] = [ 
  //           headerU.fila_0.col_1,headerU.fila_0.col_2,
  //           headerU.fila_0.col_3,headerU.fila_0.col_4,
  //           headerU.fila_0.col_5,headerU.fila_0.col_6,
  //           headerU.fila_0.col_7,headerU.fila_0.col_8,
  //         ]
  //         body2.push(rowu);
  //     }
  // }

    for (var key in this.rows2) {
        if (this.rows2.hasOwnProperty(key))
        {
            var data = this.rows2[key];
            var row:any[] = [
              data.id?.toString(),
              data.name.toString()
            ]
            // if(data.Users !=  undefined ){
            //   for (let key2 of data.Users) {
            //     if(key2.id && key2.Person && key2.Person.Gender)
            //     body2.push([
            //       key2.id.toString(),
            //       key2.Person.name.toString(),
            //       key2.Person.surname.toString(),
            //       key2.Person.identification.toString(),
            //       key2.email.toString(),
            //       key2.Person.phone.toString(),
            //       key2.Person.address.toString(),
            //       key2.Person.Gender.name.toString(),
            //     ])
            //   }
            // }
            body.push(row);
            
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
              text: `Todos Los Roles`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
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
  exportExcel() {
    let array:any[] = [];
    for (const key of this.roles) {
      array.push({ 
        id: key.id,
        Nombre:key.name,
      })
    }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "categoryGroups");
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
