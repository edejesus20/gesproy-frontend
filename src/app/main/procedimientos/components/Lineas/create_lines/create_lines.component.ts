import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Thematic_axisService } from 'src/app/core/services/investigacion/Thematic_axis.service';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { ThematicService } from 'src/app/core/services/Procedimientos/Thematic.service';
import { LineI, LineThematicI, ThematicI, Thematic_axisI } from 'src/app/models/projet/line';
import { Create_ThematicComponent } from '../../Areas y tematicas lineas/create_Thematic/create_Thematic.component';
import { Create_Thematic_axisComponent } from '../../Ejes tematicos/create_Thematic_axis/create_Thematic_axis.component';
const translate = require('translate');
@Component({
  selector: 'app-create_lines',
  templateUrl: './create_lines.component.html',
  styleUrls: ['./create_lines.component.css'],
  providers: [DialogService]
})
export class Create_linesComponent implements OnInit {

  items: MenuItem[]=[]
    
  activeIndex: number = 0;
  AnexoAdjuntado:any | null = null
  
  public form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    justification: [''],
    objectives: [''],
    // thematics: ['', [Validators.required]],
    Thematics: this.formBuilder.array([this.formBuilder.group(
      {
        ThematicId:['', [Validators.required]],
        Thematic_axis: ['', [Validators.required]]
      }
    )]),
    resolution: [''],
    Anexo: [''],
  });
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar2:boolean=true;
  public thematics:ThematicI[] =[]
  public algo:number[]=[0];
  public ref:any;
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
  public thematic_axiss: Thematic_axisI[]=[];
  filteredCountries: any[]=[];
  public Thematics1:any[]=[];
  public Dialog:boolean =false
  public bandera:boolean=false

  constructor(
    public dialogService: DialogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private lineService:LineService,
    private messageService:MessageService,
    private thematicService:ThematicService,
    private thematic_axisService:Thematic_axisService,

  ) { }

  ngOnInit() {


    this.items = [
      {
      label: 'Datos Basicos',
      command: (event: any) => {
          this.activeIndex = 0;
         }
      },
      {
          label: 'Registrar Mas Detalles',
          command: (event: any) => {
              this.activeIndex = 1;
            }
      },
    ];

    // this.buildForm();
    this.thematic()
    this.filteredCountries=[]

    // this.getAllthematic()
  }

  AreaSeleccionada(pointIndex:number,event:Event){
    event.preventDefault();
    // console.log("AreaSeleccionada")
    let control = <FormArray>this.form.controls['Thematics']
    let algo =control.controls[pointIndex].value.ThematicId
    this.thematic_axiss=[]
    if(algo != undefined && algo != ''){
      this.thematicService.getItem(algo.id).subscribe(data=>{
        if(data.thematic.Thematic_axis_Thematics !== undefined && data.thematic.Thematic_axis_Thematics.length > 0){
       
          for (let key of data.thematic.Thematic_axis_Thematics) {
          if(key.Thematic_axis != undefined && key.status == true){

          
          // for (let key of categoryGroups.categoryGroups) {
            key.Thematic_axis.name =  key.Thematic_axis.name.charAt(0).toUpperCase() +  key.Thematic_axis.name.slice(1);
          // }
          this.thematic_axiss.push(key.Thematic_axis)
        }
        }
         
        }else{
          this.thematic_axiss=[{name:'No hay registros'}]
        }
      })

    }
  }
  llenar(event:Event){
    let filterValue = (event.target as HTMLInputElement).value;
    this.filterCountry(event,filterValue)

  }
  filterCountry(event:Event,filterValue?:string){
    if(filterValue != undefined){
      let filtered : any[] = [];
      // let query = filterValue;
  
      for(let i = 0; i < this.thematic_axiss.length; i++) {
          let country = this.thematic_axiss[i];
          if (country.name.toLowerCase().indexOf(filterValue.toLowerCase()) == 0) {
              filtered.push(country);
          }
      }
      this.filteredCountries = filtered;
    }
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  

    
}
  thematic() {
    this.thematics=[]
    this.thematicService.getList().subscribe(list => {
      for (let key of list.thematics) {
        if(key.Thematic_axis_Thematics !== undefined && key.Thematic_axis_Thematics.length > 0){
          // for (let key of categoryGroups.categoryGroups) {
            key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
          // }
        this.thematics.push(key);
      }
      }
      // this.thematics=list.thematics
    })
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

  cerrar(){
    this.router.navigateByUrl('/Procedimientos/line');
  }
  private volver(){
    this.bandera=false
    this.Thematics1=[]
    this.ngOnInit()
    this.mostrar2=true
    this.vaciar()
    this.filteredCountries=[]

  }
  private vaciar(){
    this.AnexoAdjuntado=null
    this.form.reset()
    this.getThematics.reset()
    this.getThematics.clear()
    this.form.controls['name'].setValue('')
    this.form.controls['justification'].setValue('')
    this.form.controls['objectives'].setValue('')
    this.form.controls['resolution'].setValue('')
    let control = <FormArray>this.form.controls['Thematics']
    control.push(this.formBuilder.group({
      ThematicId:['', [Validators.required]],
      Thematic_axis: ['', [Validators.required]],
    }))
  }

  public onSubmit(e: Event): void {
    e.preventDefault();
   
    let control = <FormArray>this.form.controls['Thematics']
    // console.log(control)
    let formValue: any = this.form.value;

    // if(this.form.value.justification != "" ||
    //   this.form.value.objectives !="" || this.form.value.resolution ){
    //   this.detalles
    //   formValue.LineDetail={
    //     resolution: this.form.value.resolution,
    //     justification: this.form.value.justification,
    //     objectives: this.form.value.objectives
    //   }
    // }else{
    //   formValue.LineDetail=undefined
    // }
    // if(this.form.value.Anexo != ""){
    //   formValue.Anexo=this.form.value.Anexo
    // }else{
    //   formValue.Anexo=undefined
    // }
    if(this.Thematics1.length == 0 ){
      for (const key of control.value) {
        // key.ThematicId=key.ThematicId.id
        this.Thematics1.push({
          ThematicId:key.ThematicId.id,
          Thematic_axis:key.Thematic_axis
        })
      }
      formValue.Thematics = this.Thematics1
    }else{
      formValue.Thematics = this.Thematics1
    }
    console.log(formValue,'formValue')


    if(formValue.name != "" && formValue.Thematics.length > 0 ){
    this.bandera=true

    this.lineService.createItem(formValue).subscribe(
      (algo) => {
        if(algo.line.id){
          if(this.AnexoAdjuntado != null){
              let data ={
                LineId:algo.line.id,
                url:'',
                file:this.AnexoAdjuntado
                }

                this.lineService.Anexo(data.LineId.toString(),data.url.toString(),data.file).subscribe(result=>{
                  if(result){
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
                    detail: 'Registro de Linea Creado con exito'});
                    }
                    date = new Date(date.getTime() - 1000);
                    if( minutes == '00' && seconds == '01' ) {
                      this.volver()
                      // this.router.navigateByUrl('/Procedimientos/line');
                      clearInterval(interval); 
                    }
                  }, 1000);
                  }
                }, error => console.error(error))
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
            detail: 'Registro de Linea Creado con exito'});
            }
            date = new Date(date.getTime() - 1000);
            if( minutes == '00' && seconds == '01' ) {
              this.volver()
              // this.router.navigateByUrl('/Procedimientos/line');
              clearInterval(interval); 
            }
          }, 1000);
            
          }
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
    return this.form.get('Thematics') as FormArray;//obtener todos los formularios
  }

  addRoles(event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Thematics']
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group({
          ThematicId:['', [Validators.required]],
           Thematic_axis: ['', [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group({
          ThematicId:['', [Validators.required]],
           Thematic_axis: ['', [Validators.required]],
        }))

      }
      this.mostrar2=true
  }
  removeRoles(index: number,event: Event){
    event.preventDefault();
    let control = <FormArray>this.form.controls['Thematics']//aceder al control
    control.removeAt(index)
      if(control.length <= 0){
      this.mostrar2=false
      // control.push(this.formBuilder.group({
      //   ThematicId:['', [Validators.required]],
      //   Thematic_axis: ['', [Validators.required]],
      // }))
      }
      // console.log(control)
  }

  // modal
  addTematica(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_ThematicComponent, {
      width: '70%',
      // height: '55%',
      contentStyle:{'width':'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
      // baseZIndex: 1000,
      autoZIndex:true,
      data: {
        id: '1'
    },
  });

  this.ref.onClose.subscribe((person: any) =>{
      if (person) {
          this.messageService.add({severity:'info', summary: 'Tematica Creada', detail: person.name,life: 2000});
      this.thematic()

        }
  });
  }

  // removeAnexos(event: Event){
  //   event.preventDefault();
  //   // let control = <FormArray>this.form.controls['Anexos']//aceder al control
  //   // control.removeAt(index)
  //   // if(control.length <= 0){
  //   //  this.mostrar2=false
  //   //  control.push(this.formBuilder.group({Anexos:['', [Validators.required]]}))//nuevo input

  //   // }
  // }
  onFileChange(event:any) {
    event.preventDefault();
    if(this.form.value.Anexo != ''){
      if(event.target.files && event.target.files.length>0){
        const file=event.target.files[0];
        this.AnexoAdjuntado=file
        }
      }
    }
}
