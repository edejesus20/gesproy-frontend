import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { LineI, ThematicI,LineThematicI } from 'src/app/models/projet/line';
import { environment } from 'src/environments/environment';
import { threadId } from 'worker_threads';
const translate = require('translate');
@Component({
  selector: 'app-delete_lines',
  templateUrl: './delete_lines.component.html',
  styleUrls: ['./delete_lines.component.css']
})
export class Delete_linesComponent implements OnInit {
  public bandera:boolean=false
  API_URI = environment.API_URI;

  public mostrar:number=2;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form: FormGroup = this.formBuilder.group({});
  public Thematics:any[] = []
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'

  BanderaAnexo:boolean=false
  mostrarAnexo:string | null = null
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private lineService:LineService,
    private messageService:MessageService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      id:[''],
      name: ['', [Validators.required]],
      justification: ['', [Validators.required]],
      objectives: ['', [Validators.required]],
      Anexo: [''],
      resolution: ['', [Validators.required]],
    });
  }  

  public onSubmit(e: Event): void {
    e.preventDefault();
    const formValue: LineI = this.form.value;
    if( formValue.id ){
   this.bandera=true

    this.lineService.deleteItem(formValue.id).subscribe(
      () => {
        var date = new Date('2020-01-01 00:00:03');
          function padLeft(n:any){ 
            return n ="00".substring(0, "00".length - n.length) + n;
          }
          var interval = setInterval(() => {
          var minutes = padLeft(date.getMinutes() + "");
          var seconds = padLeft(date.getSeconds() + "");
          // console.log(minutes, seconds);
          if( seconds == '03') {
          this.messageService.add({severity:'success', summary: 'Success', 
          detail: 'Registro de Linea Eliminado con exito'});
          }
          date = new Date(date.getTime() - 1000);
          if( minutes == '00' && seconds == '01' ) {
            this.ngOnInit()
            this.volver(new Event(''))
           this.bandera=false
            // this.router.navigateByUrl('/Procedimientos/line');
            clearInterval(interval); 
          }
    }, 1000);
      },async error => {
        if(error != undefined) {
   this.bandera=false

          let text = await translate(error.error.message, "es");
          if(error.error.dataErros){
            text = await translate(error.error.dataErros[0].message, "es");
          }
          this.messageService.add({severity:'error', summary: 'Error', detail: `Error. ${text}`});
        }
      });
      }else{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Faltan datos'});
      }
  }

  getOneCntAccount(id:number) {
    this.lineService.getItem(id).subscribe((cnt_groupFromApi) => {
      // this.cnt_account = cnt_groupFromApi.account;
      if(cnt_groupFromApi.line.id != undefined)
      this.form.controls['id'].setValue(cnt_groupFromApi.line.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.line.name)
      // this.form.controls['justification'].setValue(cnt_groupFromApi.line.justification)
      // this.form.controls['objectives'].setValue(cnt_groupFromApi.line.objectives)
      // this.form.controls['thematics'].setValue(cnt_groupFromApi.line.thematics)
      // this.form.controls['resolution'].setValue(cnt_groupFromApi.line.resolution)

      if(cnt_groupFromApi.line.LineDetail != undefined){
        this.form.controls['justification'].setValue(cnt_groupFromApi.line.LineDetail.justification)
          this.form.controls['objectives'].setValue(cnt_groupFromApi.line.LineDetail.objectives)
        this.form.controls['resolution'].setValue(cnt_groupFromApi.line.LineDetail.resolution)
      }
      console.log(cnt_groupFromApi.line.Anexo,'cnt_groupFromApi.line.Anexo')
      if(cnt_groupFromApi.line.Anexo != undefined && cnt_groupFromApi.line.Anexo != null){
        this.mostrarAnexo=cnt_groupFromApi.line.Anexo
        this.BanderaAnexo=false

      }else{
        this.BanderaAnexo=true
        this.mostrarAnexo=null
      }
      console.log(cnt_groupFromApi.line,'cnt_groupFromApi.line.Thematics')
      if(cnt_groupFromApi.line.LineThematics != undefined && cnt_groupFromApi.line.LineThematics.length > 0){
        // this.agregarThematics(cnt_groupFromApi.line.LineThematics)  
        this.Thematics=[]
        if(cnt_groupFromApi.line.LineThematics.length > 0){
          for (let key of cnt_groupFromApi.line.LineThematics) {
            if(key.Thematic)
            this.Thematics.push({Thematic:key.Thematic,Ejes:key.Thematic_axis_Line_Thematics})
          }
          console.log(this.Thematics,'this.Thematics')
       
        }
      } 
      this.displayMaximizable2=true
      this.tabla = false
      //console.log(this.cnt_group);
    }, error => console.error(error));
  }
  agregarThematics(LineThematic:LineThematicI[]) {
    this.Thematics=[]
    if(LineThematic.length > 0){
      for (let key of LineThematic) {
        if(key.Thematic)
        this.Thematics.push(key.Thematic)
      }
      console.log(this.Thematics,'this.Thematics')
   
    }
  }

  public volver(event: Event){
    this.Thematics=[]
    event.preventDefault
    this.tabla = true
    this.ngOnInit()
    this.displayMaximizable2 = false
   this.bandera=false
  //  this.filteredCountries=[]


    //console.log(event)
  }

  ngOnDestroy() {
    this.tabla = true
    this.displayMaximizable2 = false
  }
  actualizar(id: number){
    // console.log(id)
    this.getOneCntAccount(id)
  }


}
