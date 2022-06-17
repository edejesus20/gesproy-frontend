import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ThematicI, Thematic_axisI } from 'src/app/models/projet/line';
import { ThematicService } from 'src/app/core/services/Procedimientos/Thematic.service';
import { Thematic_axisService } from 'src/app/core/services/investigacion/Thematic_axis.service';
import { Create_Thematic_axisComponent } from '../../Ejes tematicos/create_Thematic_axis/create_Thematic_axis.component';
const translate = require('translate');

@Component({
  selector: 'app-create_Thematic',
  templateUrl: './create_Thematic.component.html',
  styleUrls: ['./create_Thematic.component.css']
})
export class Create_ThematicComponent implements OnInit {
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public algo:number[]=[0];

  public mostrar2:boolean=true;
  public mostrarDialogo:boolean=false;
  public ref1:any;
  public Dialog:boolean =false
  public bandera:boolean=false
 public form:FormGroup=this.formBuilder.group({
  });

 
  public thematic_axiss: Thematic_axisI[]=[];
  public ThematicAxis: Thematic_axisI[]=[];

  constructor(
    private formBuilder: FormBuilder,
        private thematicService:ThematicService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService:MessageService,
    public ref: DynamicDialogRef,
    public dialogService: DialogService,
    private thematic_axisService:Thematic_axisService,

    public config: DynamicDialogConfig,
 ) { }

 ngOnInit() {
  this. form=this.formBuilder.group({
    name:['', [Validators.required]],
    Thematic_axis: this.formBuilder.array([this.formBuilder.group(
      {
        ThematicAxisId:['', [Validators.required]],
    }
    )]),
   })
   this.primengConfig.ripple = true;
   if(this.config.data){
    if(this.config.data.id == '1'){
      this.mostrarDialogo= true
    }
  }else{
    this.mostrarDialogo= false
  }
  this.getAllthematic()
 }

 public cancelar(){
  this.ref.close(undefined);
}

cerrar(){
  this.router.navigateByUrl('/Procedimientos/Thematic');
}
private volver(){
  this.bandera=false
  this.ThematicAxis=[]
  this.ngOnInit()
}

 public onSubmit() {
  let formValue: any = this.form.value;
  let control = <FormArray>this.form.controls['Thematic_axis']
  let array:any[] =[]
  if(this.ThematicAxis.length == 0){
    for (let key of control.value) {
      key.ThematicAxisId=key.ThematicAxisId.id
      array.push({ThematicAxisId:key.ThematicAxisId})
    }
    this.ThematicAxis=control.value
    formValue.Thematic_axis=control.value
  }else{
    formValue.Thematic_axis=this.ThematicAxis

  } 
  
  
  if(formValue.name != ''&& array.length > 0 ){
  this.bandera=true

  this.thematicService.createItem(formValue).subscribe(
    (algo) => {
      if(this.mostrarDialogo== true){
        this.ref.close(algo);
      }else{
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
              detail: 'Area Tematica Creada con exito'});
              }
              date = new Date(date.getTime() - 1000);
              if( minutes == '00' && seconds == '01' ) {
                this.volver()
                // this.router.navigateByUrl('/Procedimientos/Thematic');
                clearInterval(interval); 
               }
        }, 1000);
      }
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

get getThematics() {
  return this.form.get('Thematic_axis') as FormArray;//obtener todos los formularios
}

addRoles(event: Event){
  event.preventDefault();
  const control = <FormArray>this.form.controls['Thematic_axis']
    if(control.length == 0 && this.mostrar2 == false){
    
      control.push(this.formBuilder.group({
        ThematicAxisId:['', [Validators.required]],
      }))
    }
    if(control.length >= 1 && this.mostrar2 == true){
      control.push(this.formBuilder.group({
        ThematicAxisId:['', [Validators.required]],
      }))

    }
    this.mostrar2=true
    
}
removeRoles(index: number,event: Event){
  event.preventDefault();
  let control = <FormArray>this.form.controls['Thematic_axis']//aceder al control
  control.removeAt(index)
    if(control.length <= 0){
    this.mostrar2=false
    control.push(this.formBuilder.group({
      ThematicAxisId:['', [Validators.required]],
    }))
    }
    // console.log(control)
}
addTematica(e:Event){
  e.preventDefault()

  this.ref1 = this.dialogService.open(Create_Thematic_axisComponent, {
    width: '35%',
    height: '50%',
    contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
    baseZIndex: 10000,
    data: {
      id: '1'
  },
});

this.ref1.onClose.subscribe((person: any) =>{
    if (person) {
        this.messageService.add({severity:'info', summary: 'Eje Temático Creada', detail: person.name,life: 2000});
    this.getAllthematic()

      }
});
}
 public getAllthematic() {
    this.thematic_axisService.getList().subscribe((scalesApiFrom) => {
      for (let key of scalesApiFrom.thematic_axiss) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
      this.thematic_axiss =scalesApiFrom.thematic_axiss
      // console.log(this.thematic_axiss)
    })
  }
}
