import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import { InvestigatorCollaboratorI } from 'src/app/models/user/investigator_colabolator';
import { InvestigadorColaboladorService } from 'src/app/core/services/usuer/InvestigadorColabolador.service';

@Component({
  selector: 'app-show_InvestigatorCollaborator',
  templateUrl: './show_InvestigatorCollaborator.component.html',
  styleUrls: ['./show_InvestigatorCollaborator.component.css']
})
export class Show_InvestigatorCollaboratorComponent implements OnInit {


  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  public investigatorCollaborators:InvestigatorCollaboratorI[]=[];
  first = 0;
  loading: boolean = true;
  rows = 1;
  cols: any[]=[];
  private rows2:InvestigatorCollaboratorI[] = []
  exportColumns: any[]=[];
  selectedProducts: InvestigatorCollaboratorI[]=[];

  constructor(
    private investigadorColaboladorService:InvestigadorColaboladorService,
    private primengConfig: PrimeNGConfig) { 
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
    ];
  
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
      this.getUniversitys()
    }
  
    getUniversitys() {
      this.investigadorColaboladorService.getList().subscribe((instititionsFromApi) => {
        this.investigatorCollaborators =instititionsFromApi.investigatorCollaborators;
        this.rows2=[]
        if(instititionsFromApi.investigatorCollaborators != undefined){
          for (const key of instititionsFromApi.investigatorCollaborators) {
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
  for (const key of this.investigatorCollaborators) {
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
        this.saveAsExcelFile(excelBuffer, "investigatorCollaborators");
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
              text: `Investigadores Colaboladores`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
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
  }
  
  delet(id: number){
    this.modificar.emit(id)
  }
  detalle(id: number){
    this.modificar.emit(id)
  }

}
