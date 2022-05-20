import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  public form: FormGroup = this.formBuilder.group({});
  displayMaximizable2:boolean=true
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public mostrar2:boolean=false;
  public thematics:ThematicI[] =[]
  public algo:number[]=[0];
  public ref:any;
  public image:string='assets/images/images.jpg'
  public image2:string='assets/images/uniguajira_iso.jpg'
  public thematic_axiss: Thematic_axisI[]=[];
  filteredCountries: any[]=[];
  public Thematics1:any[]=[];
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
    this.buildForm();
    this.thematic()
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
       
          for (const key of data.thematic.Thematic_axis_Thematics) {
          if(key.Thematic_axis != undefined && key.status == true)
          this.thematic_axiss.push(key.Thematic_axis)
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
      let query = filterValue;
  
      for(let i = 0; i < this.thematic_axiss.length; i++) {
          let country = this.thematic_axiss[i];
          if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(country);
          }
      }
      this.filteredCountries = filtered;
    }
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  

    
}
  thematic() {
    this.thematicService.getList().subscribe(list => {
      for (const key of list.thematics) {
        if(key.Thematic_axis_Thematics !== undefined && key.Thematic_axis_Thematics.length > 0){

        this.thematics.push(key);
      }
      }
      // this.thematics=list.thematics
    })
  }
  public getAllthematic() {
    this.thematic_axisService.getList().subscribe((scalesApiFrom) => {
      this.thematic_axiss =scalesApiFrom.thematic_axiss
      // console.log(this.thematic_axiss)
    })
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      justification: ['', [Validators.required]],
      objectives: ['', [Validators.required]],
      // thematics: ['', [Validators.required]],
      Thematics: this.formBuilder.array([this.formBuilder.group(
        {
          ThematicId:['', [Validators.required]],
          Thematic_axis: ['', [Validators.required]],
      })]),
      resolution: [''],
    });
  }  

  public onSubmit(e: Event): void {
    e.preventDefault();
   
    let control = <FormArray>this.form.controls['Thematics']
    // console.log(control)
    let formValue: LineI = this.form.value;

    
    if(this.Thematics1.length == 0 ){
      for (let key of control.value) {

        key.ThematicId=key.ThematicId.id
        this.Thematics1.push({
          ThematicId:key.ThematicId,
          Thematic_axis:key.Thematic_axis
        })
      }
      formValue.Thematics = this.form.value.Thematics
    }else{
      formValue.Thematics = this.Thematics1
    }
    // console.log(control)


    if(formValue.name != "" && formValue.justification != "" && 
    formValue.objectives !="" ){
    this.lineService.createItem(formValue).subscribe(
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
          detail: 'Registro de Linea Creado con exito'});
          }
          date = new Date(date.getTime() - 1000);
          if( minutes == '00' && seconds == '01' ) {
            this.router.navigateByUrl('/Procedimientos/line');
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
    return this.form.get('Thematics') as FormArray;//obtener todos los formularios
  }

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Thematics']
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
      control.push(this.formBuilder.group({
        ThematicId:['', [Validators.required]],
        Thematic_axis: ['', [Validators.required]],
      }))
      }
      // console.log(control)
  }


  // modal

  addTematica(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_ThematicComponent, {
      width: '50%',
      height: '50%',
      contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
      baseZIndex: 10000,
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

  // addeJES(e:Event){
  //   e.preventDefault()
  
  //   this.ref = this.dialogService.open(Create_Thematic_axisComponent, {
  //     width: '35%',
  //     height: '50%',
  //     contentStyle:{'overflow-y': 'auto'} ,closable:true, closeOnEscape:false, showHeader:false, 
  //     baseZIndex: 10000,
  //     data: {
  //       id: '1'
  //   },
  // });
  
  // this.ref.onClose.subscribe((person: any) =>{
  //     if (person) {
  //         this.messageService.add({severity:'info', summary: 'Eje Temático Creada', detail: person.name,life: 2000});
  //     this.getAllthematic()
  
  //       }
  // });
  // }
}
