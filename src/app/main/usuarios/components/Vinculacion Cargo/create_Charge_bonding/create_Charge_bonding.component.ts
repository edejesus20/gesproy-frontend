import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScaleService } from 'src/app/core/services/institution/Scale.service';
const translate = require('translate');
import { Charge_bondingService } from 'src/app/core/services/investigacion/Charge_bonding.service';
import { Create_EscalafonComponent } from 'src/app/main/investigacion/components/Escalafon/create_Escalafon/create_Escalafon.component';
import { ScaleI } from 'src/app/models/institution/scale';
import { Charge_bondingI } from 'src/app/models/user/teacher';

@Component({
  selector: 'app-create_Charge_bonding',
  templateUrl: './create_Charge_bonding.component.html',
  styleUrls: ['./create_Charge_bonding.component.css'],
  providers: [DialogService]
})
export class Create_Charge_bondingComponent implements OnInit {
  public Dialog:boolean =false
   public bandera:boolean=false
  public form:FormGroup=this.formBuilder.group({
    name:['', [Validators.required]],
    Scales: this.formBuilder.array([this.formBuilder.group({
      ScaleId:['']})]),
   });

  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!0123456789]+$/ 
  public mostrar2:boolean=false;
  public scales: ScaleI[]=[];
   public Scale:any[] =[]
   public ref1:any;
   algo:any[]=[0]
  public mostrarDialogo:boolean=false;
 
  constructor(
    public dialogService: DialogService,
    private scaleService:ScaleService,

    private router: Router,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private primengConfig: PrimeNGConfig,
    private charge_bondingService:Charge_bondingService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,

  ) { }

  ngOnInit() {
    // this.form=this.formBuilder.group({
    //   name:['', [Validators.required]],
    //   Scales: this.formBuilder.array([this.formBuilder.group({
    //     ScaleId:['']})]),
    //  });
    this.primengConfig.ripple = true;
    if(this.config.data){
      if(this.config.data.id == '1'){
        this.mostrarDialogo= true
      }
    }else{
      this.mostrarDialogo= false
    }
    this.getAllScale()
  }
  public cancelar(){
    this.ref.close(undefined);
  }
  cerrar(){
    this.router.navigateByUrl('/usuarios/Charge_bonding');
  }
 private volver(){
    this.bandera=false
    this.Scale=[]
    this.ngOnInit()
    this.vaciar()
}
private vaciar(){
  this.form.reset()
  this.getRoles.reset()
  this.getRoles.clear()
  this.form.controls['name'].setValue('')
  let control = <FormArray>this.form.controls['Scales']
  control.push(this.formBuilder.group({
    ScaleId:['']
  }))
}

  getAllScale() {
    this.scaleService.getList().subscribe((scalesApiFrom) => {
      this.scales =scalesApiFrom.scales
    })
  }

  public onSubmit() {
    let formValue: Charge_bondingI = this.form.value;
    let control = <FormArray>this.form.controls['Scales']
    if(this.Scale.length == 0  || this.Scale.length == undefined){

      for (const key of control.value) {
        key.ScaleId=key.ScaleId.id 
        this.Scale.push({
          ScaleId:key.ScaleId,
        })
      }
      formValue.Scales = this.form.value.Scales
      // console.log('aqui')
    }else{
      formValue.Scales = this.Scale
      // console.log('aqui2')

    }
    if(control.value[0].ScaleId == undefined){
      formValue.Scales=[]
    }
      // console.log(formValue)

    if(formValue.name != ''){
    this.bandera=true

    this.charge_bondingService.createItem(formValue).subscribe(
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
                detail: 'Vinculación Creada con exito'});
                }
                date = new Date(date.getTime() - 1000);
                if( minutes == '00' && seconds == '01' ) {
                  this.volver()
                  // this.router.navigateByUrl('/usuarios/Charge_bonding');
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


get getRoles() {
  return this.form.get('Scales') as FormArray;//obtener todos los formularios
}

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Scales']
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group(
          {   ScaleId:['']}))
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group(
          {   ScaleId:['']}))

      }
      this.mostrar2=true
  }

  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Scales']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar2=false
      control.push(this.formBuilder.group({
           ScaleId:['']}))
      }
  }


  addroles(e:Event){
    e.preventDefault()
  
    this.ref1 = this.dialogService.open(Create_EscalafonComponent, {
      width: '35%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:true, showHeader:false, 
      baseZIndex: 10000,
      data: {
        id: '1'
    },
  });
  
  this.ref1.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Escalafon Creado', detail: person.name,life: 2000});
      this.getAllScale()
  
        }
  });
  }
}
