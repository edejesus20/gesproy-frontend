import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import {  PrimeNGConfig } from 'primeng/api';

import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { LineI } from 'src/app/models/projet/line';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { GroupI } from 'src/app/models/institution/group';
import { ProgramService } from 'src/app/core/services/program/program.service';

@Component({
  selector: 'app-show_grupodeInvetigacion',
  templateUrl: './show_grupodeInvetigacion.component.html',
  styleUrls: ['./show_grupodeInvetigacion.component.css']
})
export class Show_grupodeInvetigacionComponent implements OnInit {
  public groups:GroupI[]=[]
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];
  private rows2:GroupI[] = []
  exportColumns: any[]=[];
  selectedProducts: GroupI[]=[];
  constructor(
    private groupService:GroupService,
    private lineService:LineService,
    private programService:ProgramService,
    private primengConfig: PrimeNGConfig,
    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }
  ngOnInit() {
    this.primengConfig.ripple = true;
      this.loading = false;
      this.cols = [
      { field: 'name', header: 'Nombre' },
      // { field: 'group_code', header: 'Codigo' },
      { field: 'ObjetivoGeneral', header: 'Objetivo General' },
      // { field: 'ident_colciencias', header: 'Identificacion Colciencias' },
      { field: 'Program.Faculty.name', header: 'Facultad' },
      // { field: 'CategoryGroup.name', header: 'Categoria' },
      // { field: 'Link_gruplac', header: 'Link Gruplac' },
      // { field: 'resolution', header: 'Resolución' },
      { field: 'Teacher.User.fullName', header: 'Lider' },
    ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getUsrRoles()
  }
  getUsrRoles() {
    this.groupService.getList().subscribe((rolesFromApi) => {
      this.groups =rolesFromApi.groups
      console.log(this.groups)
      
      this.rows2=[]
      if(rolesFromApi.groups != undefined){
        for (const key of rolesFromApi.groups) {
            this.rows2.push(
              {
                id:key.id,
                name: key.name,
                // ident_colciencias:key.ident_colciencias,
                HeadquarterProgramId:key.HeadquarterProgramId,
                TeacherId:key.TeacherId,
                group_code:key.group_code,
                ObjetivoGeneral:key.ObjetivoGeneral,
                CategoryGroupId:key.CategoryGroupId,
                resolution:key.resolution,
                Link_gruplac:key.Link_gruplac,
                CategoryGroup:key.CategoryGroup,
                Teacher:key.Teacher,
                Program:key.Program
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
    for (const key of this.groups) {
      array.push({ 
        id: key.id,
        Nombre:key.name,
        // Identificacion_Colciencias:key.ident_colciencias,
        // HeadquarterProgramId:key.HeadquarterProgramId,
        Facultad:key.Program?.Faculty?.name,
        // Codigo:key.group_code,
        ObjetivoGeneral:key.ObjetivoGeneral,
        // CategoryGroupId:key.CategoryGroupId,
        // Resolución:key.resolution,
        // Link_Gruplac:key.Link_gruplac,
        // Categoria:key.CategoryGroup?.name,
        Lider:key.Teacher?.User?.fullName,
      })
    }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "lineas");
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
            // col_1:{ text: 'ID', style: 'tableHeader',fontSize: 12 ,bold: true, },
            col_2:{ text: 'NOMBRE', style: 'tableHeader' ,bold: true, },
            // col_3:{ text: 'IDENTIFICACIÓN COLCIENCIAS', style: 'tableHeader' ,bold: true, },
            // col_5:{ text: 'CODIGO', style: 'tableHeader' ,bold: true, },
            col_11:{ text: 'FACULTAD', style: 'tableHeader' ,bold: true, },
            col_6:{ text: 'OBJETIVO GENERAL', style: 'tableHeader' ,bold: true, },
            // col_7:{ text: 'RESOLUCION', style: 'tableHeader' ,bold: true, },
            // col_8:{ text: 'LINK GRUPLAC', style: 'tableHeader' ,bold: true, },
            // col_9:{ text: 'CATEGORIA', style: 'tableHeader' ,bold: true, },
            col_10:{ text: 'LIDER', style: 'tableHeader' ,bold: true, },
        }
      }]

    
      var body = [];
      // var body2 = [];
      for (var key in headers){
          if (headers.hasOwnProperty(key)){
              var headerU = headers[key];
              var row:any[] = [ 
                // headerU.fila_0.col_1,
                headerU.fila_0.col_2,
              // headerU.fila_0.col_3,
              // headerU.fila_0.col_5,
              headerU.fila_0.col_11,
              headerU.fila_0.col_6,
              // headerU.fila_0.col_7,
              // headerU.fila_0.col_8,
              // headerU.fila_0.col_9,
              headerU.fila_0.col_10,
              ]
              body.push(row);
          }
      }
  let facultad:string =''
  // console.log('aqui',this.groups[0].Program)
      for (var key in this.groups) {
      
          if (this.groups.hasOwnProperty(key))
          {
              var data = this.groups[key];
              // if(data.Program?.Faculty?.name != undefined){
                
              //   facultad=data.Program?.Faculty?.name
              // }
              var row:any[] = [
                // data.id?.toString(),
                data.name.toString(),
                // data.ident_colciencias.toString(),
                // data.group_code.toString(),
                data.Program?.Faculty?.name.toString(),
                data.ObjetivoGeneral.toString(),
                // data.resolution?.toString(),
                // data.Link_gruplac.toString(),
                // data.CategoryGroup?.name.toString(),
                data.Teacher?.User?.fullName.toString(),
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
                text: `Todos Los Grupos de Investigación`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
              }
            ],
    
            columnGap: 10,
    
          },
          {
            style: 'tableExample',
            fontSize: 8,
            table: {
              headerRows: 1,
              // widths: [ '12%', '12%', '8%','23%','10%','10%','8%','12%'],
              widths: [ '25%', '25%','25%','25%'],
             
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
