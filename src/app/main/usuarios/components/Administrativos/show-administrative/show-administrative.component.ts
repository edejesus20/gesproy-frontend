import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';
import { AdministrativeService } from 'src/app/core/services/usuer/Administrative.service';
import { AdministrativeI } from 'src/app/models/user/administrative';
@Component({
  selector: 'app-show-administrative',
  templateUrl: './show-administrative.component.html',
  styleUrls: ['./show-administrative.component.css']
})
export class ShowAdministrativeComponent implements OnInit {

  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  public administratives:AdministrativeI[]=[];
  first = 0;
  loading: boolean = true;
  rows = 1;
  cols: any[]=[];
  private rows2:AdministrativeI[] = []
  exportColumns: any[]=[];
  selectedProducts: AdministrativeI[]=[];

  constructor(
    private administrativeService:AdministrativeService,
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
        { field: 'Ocupation.name', header: 'Ocupación' },
        { field: 'Headquarter.name', header: 'Sede' },
    ];
  
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
      this.getUniversitys()
    }
  
    getUniversitys() {
      this.administrativeService.getList().subscribe((instititionsFromApi) => {
        this.administratives =instititionsFromApi.administratives;
        this.rows2=[]
        if(instititionsFromApi.administratives != undefined){
          for (const key of instititionsFromApi.administratives) {
            this.rows2.push(
              {
                UserId: key.UserId,
                OcupationId: key.OcupationId,
                HeadquarterId: key.HeadquarterId,
                User:key.User,
                Ocupation:key.Ocupation,
                Headquarter:key.Headquarter,
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
  if(this.selectedProducts.length > 0){
    for (const key of this.selectedProducts) {
      array.push({ 
        id: key.id,
        Nombre_Completo:key.User?.fullName,
        Identificacion:key.User?.Person?.identification,
        Correo_Electronico:key.User?.email,
        Telefono:key.User?.Person?.phone,
        Ocupación:key.Ocupation?.name,
        Sede:key.Headquarter?.name
      })
    }
  }else{
  for (const key of this.administratives) {
    array.push({ 
      id: key.id,
      Nombre_Completo:key.User?.fullName,
      Identificacion:key.User?.Person?.identification,
      Correo_Electronico:key.User?.email,
      Telefono:key.User?.Person?.phone,
      Ocupación:key.Ocupation?.name,
      Sede:key.Headquarter?.name
    })
  }
}
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "administratives");
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
          col_5:{ text: 'OCUPACIÓN', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_6:{ text: 'SEDE', style: 'tableHeader',fontSize: 12 ,bold: true, },
      }
    }]
  
    var body = [];
    for (var key in headers){
        if (headers.hasOwnProperty(key)){
            var header = headers[key];
            var row:any[] = [ header.fila_0.col_1,header.fila_0.col_2,header.fila_0.col_3,
              header.fila_0.col_4,header.fila_0.col_5,header.fila_0.col_6
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
              data.Ocupation?.name.toString(),
              data.Headquarter?.name.toString() +' - '+ data.Headquarter?.University?.name.toString()
          
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
              data.Ocupation?.name.toString(),
              data.Headquarter?.name.toString() +' - '+ data.Headquarter?.University?.name.toString()
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
              text: `Administrativos`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
            }
          ],
  
          columnGap: 10,
  
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
              widths: [ '15%', '15%','20%','15%','15%','20%'],
  
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
