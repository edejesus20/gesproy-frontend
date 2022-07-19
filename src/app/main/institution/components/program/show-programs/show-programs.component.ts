import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';
import { getBase64ImageFromURL } from 'src/app/models/helpers';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake  from 'pdfMake/build/pdfmake';


import { ProgramService } from 'src/app/core/services/program/program.service';
import { ProgramI } from 'src/app/models/institution/program';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';



@Component({
  selector: 'app-show-programs',
  templateUrl: './show-programs.component.html',
  styleUrls: ['./show-programs.component.scss']
})
export class ShowProgramsComponent implements OnInit {
 
  public programs:ProgramI[]=[];
  first = 0;
  loading: boolean = true;
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  rows = 1;
  cols: any[]=[];

  private rows2:ProgramI[] = []

  exportColumns: any[]=[];
  selectedProducts: ProgramI[]=[];
  public headquarters: HeadquarterI[]=[]
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
  public HeadquarterId:any | null=null
  constructor(
    private programService: ProgramService ,
     private primengConfig: PrimeNGConfig,
    private headquarterService: HeadquarterService,

    ) { (window as any). pdfMake.vfs=pdfFonts.pdfMake.vfs }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loading = false;
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'Faculty.name', header: 'Facultad' },
      { field: 'Faculty.Administrative.User.fullName', header: 'Decanatura' },
      { field: 'Category.name', header: 'Categoria' },
      { field: 'createdAt', header: 'Fecha' }
  ];
  
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.getAllProgram()
    this.getAllheadquarters()
  }
  private getAllheadquarters() {
    this.headquarterService.getList().subscribe(
      (AdministrativeFromApi) => {
        this.headquarters = AdministrativeFromApi.headquarters;
      }, error => console.error(error));
  }

  getHeadquarter(e:Event){
    e.preventDefault();
    if(this.HeadquarterId != null){
      this.headquarterService.getHeadquarterProgramas(this.HeadquarterId.id).subscribe(
        (AdministrativeFromApi) => {
          if(AdministrativeFromApi.programs){
              this.programs=AdministrativeFromApi.programs

            console.log(this.programs)

          }
     
        }, error => console.error(error));

    }

  }
Buscar(event: Event, dt1:any){
    event.preventDefault();
    
      const filterValue = (event.target as HTMLInputElement).value;
      dt1.filterGlobal(filterValue, 'contains')
  }

  getAllProgram() {
    this.programService.getList().subscribe((programsFromApi) => {
   
      this.rows2=[]
      console.log(programsFromApi.programs,'programs')
      for (const key of programsFromApi.programs) {
        if(key.LinePrograms !== undefined && key.LinePrograms?.length > 0) {
          for (let index = 0; index < key.LinePrograms.length; index++) {
            const docente = key.LinePrograms[index];
            if(docente.status == false){
              key.LinePrograms.splice(index,1) 
  
            }
          }
        }
      }
      this.programs =programsFromApi.programs

      if(programsFromApi.programs != undefined){
        for (const key of programsFromApi.programs) {
          this.rows2.push(
            {
              name:  key.name,
              FacultyId:  key.FacultyId,
              CategoryId: key.CategoryId,
              Faculty:key.Faculty,
              Category:key.Category,
              createdAt:key.createdAt,
              Headquarters:key.Headquarters,
              LinePrograms:key.LinePrograms
              
            }
          )
        }
      }
    }, error => console.error(error));

  }

  async gerenratePdf(){
    const DATA = <HTMLDivElement> document.getElementById('todo');
    var headers = [{
      fila_0:{
          col_1:{ text: 'NOMBRE', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_2:{ text: 'FACULTAD', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_3:{ text: 'DECANATURA', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_5:{ text: 'CATEGORIA', style: 'tableHeader',fontSize: 12 ,bold: true, },
          col_6:{ text: 'FECHA', style: 'tableHeader',fontSize: 12 ,bold: true, }
      }
    }]
  
    var body = [];
    for (var key in headers){
        if (headers.hasOwnProperty(key)){
            var header = headers[key];
            var row:any[] = [ header.fila_0.col_1,header.fila_0.col_2,
              header.fila_0.col_3,header.fila_0.col_5,header.fila_0.col_6]
            body.push(row);
        }
    }
    if(this.selectedProducts.length > 0){
      for (const key in this.selectedProducts) {
        if (this.selectedProducts.hasOwnProperty(key))
        {
            var data = this.selectedProducts[key];
            var row:any[] = [
              data.name.toString(),
              data.Faculty?.name.toString(),
              data.Faculty?.Administrative?.User?.fullName.toString()
              ,data.Category?.name.toString(),
              data.createdAt?.toString()
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
              data.name.toString(),
              data.Faculty?.name.toString(),
              data.Faculty?.Administrative?.User?.fullName.toString()
              ,data.Category?.name.toString(),
              data.createdAt?.toString()
            ]
  
            body.push(row);
        }
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
              text: `Programas`, alignment: 'center', fontSize: 15 ,bold: true,margin: [ 0, 40, 0, 0 ]
            }
          ],
  
          columnGap: 10,
  
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
              widths: [ '20%', '20%','25%','25%','10%'],
  
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
          Nombre_Completo:key.name,
          Facultad:key.Faculty?.name,
          Decanatura:key.Faculty?.Administrative?.User?.fullName,
          Categoria:key.Category?.name
        })
      }
    }else{
    for (const key of this.programs) {
      array.push({ 
        id: key.id,
        Nombre_Completo:key.name,
        Facultad:key.Faculty?.name,
        Decanatura:key.Faculty?.Administrative?.User?.fullName,
        Categoria:key.Category?.name
      })
    }
  }
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(array);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "programs");
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
  vincular(id: number){
    this.modificar.emit(id)
  }
}
