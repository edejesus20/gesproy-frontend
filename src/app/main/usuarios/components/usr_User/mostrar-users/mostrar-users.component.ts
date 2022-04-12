import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import {  PrimeNGConfig } from 'primeng/api';


import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { UserI } from 'src/app/models/authorization/usr_User';
import { PersonI } from 'src/app/models/user/person';

@Component({
  selector: 'app-mostrar-users',
  templateUrl: './mostrar-users.component.html',
  styleUrls: ['./mostrar-users.component.css']
})
export class MostrarUsersComponent implements OnInit {
  public users:PersonI[]=[]
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];
  private rows2:PersonI[] = []
  exportColumns: any[]=[];
  selectedProducts: PersonI[]=[]; 

  constructor(
    private userService: UserService,
    private router:Router,
    private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }

    ngOnInit(): void {
      this.primengConfig.ripple = true;
      this.loading = false;
      this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'surname', header: 'Apellido' },
      { field: 'identification', header: 'Identificacion' },
      { field: 'User.email', header: 'Correo Electronico' },
      { field: 'phone', header: 'Telefono' },
      { field: 'address', header: 'Direccion' },
      { field: 'Gender.name', header: 'Genero' },
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
      this.getAllScale() 
    }
  
    getAllScale() {
      this.userService.getUser().subscribe((categoryGroupsApiFrom) => {
        this.users =categoryGroupsApiFrom.users
        this.rows2=[]
        if(categoryGroupsApiFrom.users != undefined){
          for (const key of categoryGroupsApiFrom.users) {
            this.rows2.push(
              {
                id:key.id,
                name: key.name,
                surname: key.surname,
                DocumentTypeId: key.DocumentTypeId,
                identification: key.identification,
                GenderId: key.GenderId,
                UserId: key.UserId,
                address: key.address,
                phone: key.phone,
                Gender:key.Gender,
                DocumentType:key.DocumentType,
                User:key.User,
                nationality: key.nationality,
                date_of_birth: key.date_of_birth
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
            col_1:{ text: 'ID', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_2:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_3:{ text: 'APELLIDO', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_4:{ text: 'IDENTIFICACIÓN', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_5:{ text: 'CORREO', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_6:{ text: 'TELEFONO', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_7:{ text: 'DIRECCIÓN', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_8:{ text: 'GENERO', style: 'tableHeader',fontSize: 12 ,bold: true, },
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
                header.fila_0.col_7,header.fila_0.col_8,
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
                data.surname.toString(),
                data.identification.toString(),
                data.User?.email?.toString(),
                data.phone.toString(),
                data.address.toString(),
                data.Gender?.name?.toString(),
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
                data.surname.toString(),
                data.identification.toString(),
                data.User?.email?.toString(),
                data.phone.toString(),
                data.address.toString(),
                data.Gender?.name?.toString(),
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
                text: `Todos Los Usuarios`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
              }
            ],
    
            columnGap: 10,
    
          },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
                widths: [ '3%', '15%', '15%', '15%', '10%', '12%', '10%', '10%'],
    
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
            Nombre:key.name,
            Apellido:key.surname,
            Identificacion:key.identification,
            Correo_Electronico:key.User?.email,
            Telefono:key.phone,
            Direccion:key.address,
            Genero:key.Gender?.name,
          })
        }
      }else{
      for (const key of this.users) {
        array.push({ 
          id: key.id,
          Nombre:key.name,
          Apellido:key.surname,
          Identificacion:key.identification,
          Correo_Electronico:key.User?.email,
          Telefono:key.phone,
          Direccion:key.address,
          Genero:key.Gender?.name,
        })
      }
    }
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(array);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "users");
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
