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

// TODO: Fix with spaces and move to own file

@Component({
  selector: 'app-edit_Thematic',
  templateUrl: './edit_Thematic.component.html',
  styleUrls: ['./edit_Thematic.component.css']
})
export class Edit_ThematicComponent implements OnInit {
  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=true
  public algo:number[]=[0];

  public mostrar2:boolean=false;
  public mostrarDialogo:boolean=false;
  public ref1:any;
  public form:FormGroup=this.formBuilder.group({
    id:[''],
    name:['', [Validators.required]],
    Thematic_axis: this.formBuilder.array([this.formBuilder.group(
      {
        ThematicAxisId:['', [Validators.required]],
    }
    )]),
   })
  public thematic_axiss: Thematic_axisI[]=[];

  constructor(
    private formBuilder: FormBuilder,

    private thematicService:ThematicService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService:MessageService,
    public dialogService: DialogService,
    private thematic_axisService:Thematic_axisService,
 ) { }

 ngOnInit() {
   this.primengConfig.ripple = true;
  this.getAllthematic()


 }
 public volver(event: Event){
   event.preventDefault
   this.tabla = true
   this.displayMaximizable2 = false
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

 getOneCntAccount(id:number) {
 this.thematicService.getItem(id).subscribe((cnt_groupFromApi) => {
  // console.log(cnt_groupFromApi.thematic)
 
   if(cnt_groupFromApi.thematic != undefined){
       
     this.form.controls['id'].setValue(cnt_groupFromApi.thematic.id)
     this.form.controls['name'].setValue(cnt_groupFromApi.thematic.name)
     if(cnt_groupFromApi.thematic.Thematic_axes != undefined && 
      cnt_groupFromApi.thematic.Thematic_axes.length > 0){
      this.agregarEjes(cnt_groupFromApi.thematic.Thematic_axes)
      // console.log(cnt_groupFromApi.thematic.Thematic_axes)

     }
    
         }
   this.displayMaximizable2=true
   this.tabla = false
 }, error => console.error(error));
 }
  agregarEjes(Thematic_axes: Thematic_axisI[]) {
    if(Thematic_axes.length){
      // console.log(Thematic_axes)

      for (let key of Thematic_axes) {
        if(key.id != undefined ) {
          // console.log(DiscountLine)
          
          let control = <FormArray>this.form.controls['Thematic_axis']
            this.thematic_axisService.getItem(key.id).subscribe((algo)=>{
              if(algo.thematic_axis && key.id != undefined){
                  control.push(this.formBuilder.group({
                    ThematicAxisId:[algo.thematic_axis, [Validators.required]],
                    // ThematicAxisId:[key, [Validators.required]],

                  }))
                }
            })
        }
      }
      this.mostrar2= true
      let control = <FormArray>this.form.controls['Thematic_axis']
      control.removeAt(0)
      // this.getAllthematic()
      console.log(control)
    }
  }

 public onSubmit() {
  // console.log(f)
  let control = <FormArray>this.form.controls['Thematic_axis']
  let array:any[] =[]
  for (let key of control.value) {
    key.ThematicAxisId=key.ThematicAxisId.id
    array.push({ThematicAxisId:key.ThematicAxisId})
  }
  let formValue: ThematicI = this.form.value;

  // console.log(formValue)

  if(formValue.name != ''){
    if(formValue.id)
  this.thematicService.updateItem(formValue.id,formValue).subscribe(
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
              detail: 'Area Tematica Actualizada con exito'});
              }
              date = new Date(date.getTime() - 1000);
              if( minutes == '00' && seconds == '01' ) {
                this.router.navigateByUrl('/Procedimientos/Thematic');
                clearInterval(interval); 
               }
        }, 1000);
    },async error => {
      if(error != undefined) {
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
      this.thematic_axiss =scalesApiFrom.thematic_axiss
      // console.log(this.thematic_axiss)
    })
  }
}
