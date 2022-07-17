import { Component, OnInit } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Thematic_axisService } from 'src/app/core/services/investigacion/Thematic_axis.service';
import { LineService } from 'src/app/core/services/Procedimientos/Line.service';
import { ThematicService } from 'src/app/core/services/Procedimientos/Thematic.service';
import { LineI, LineThematicI, ThematicI, Thematic_axisI } from 'src/app/models/projet/line';
import { environment } from 'src/environments/environment';
import { Create_ThematicComponent } from '../../Areas y tematicas lineas/create_Thematic/create_Thematic.component';
import { Create_Thematic_axisComponent } from '../../Ejes tematicos/create_Thematic_axis/create_Thematic_axis.component';
const translate = require('translate');
@Component({
  selector: 'app-edit_lines',
  templateUrl: './edit_lines.component.html',
  styleUrls: ['./edit_lines.component.css'],
  providers: [DialogService]
})
export class Edit_linesComponent implements OnInit {
  public bandera:boolean=false
  API_URI = environment.API_URI;
  items: MenuItem[]=[]
    
  activeIndex: number = 0;
  AnexoAdjuntado:any | null = null
  BanderaAnexo:boolean=false
  mostrarAnexo:string | null = null
  
  public mostrar:number=1;
  public tabla:boolean=true;
  displayMaximizable2:boolean=false
  blockSpecial: RegExp = /^[^<>*!]+$/ 
  public form: FormGroup = this.formBuilder.group({});
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
    this.buildForm();
    this.filteredCountries=[]
    
  }
  AreaSeleccionada(pointIndex:number,event:Event){
    event.preventDefault();
    // console.log("AreaSeleccionada")
    let control = <FormArray>this.form.controls['Thematics']
    let algo =control.controls[pointIndex].value.ThematicId
    if(algo != undefined && algo != ''){
    this.thematic_axiss=[]

      this.thematicService.getItem(algo.id).subscribe(data=>{
        if(data.thematic.Thematic_axis_Thematics !== undefined && data.thematic.Thematic_axis_Thematics.length > 0){
    
          for (const key of data.thematic.Thematic_axis_Thematics) {
            if(key.Thematic_axis != undefined && key.status == true){

          
              // for (let key of categoryGroups.categoryGroups) {
                key.Thematic_axis.name =  key.Thematic_axis.name.charAt(0).toUpperCase() +  key.Thematic_axis.name.slice(1);
              // }
              this.thematic_axiss.push(key.Thematic_axis)
            }
          // if(key.Thematic_axis != undefined && key.status == true)
          // this.thematic_axiss.push(key.Thematic_axis)
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
  // thematic() {
  //   this.thematicService.getList().subscribe(list => {
  //     for (const key of list.thematics) {
  //       if(key.Thematic_axes !== undefined && key.Thematic_axes.length > 0){

  //       this.thematics.push(key);
  //     }
  //     }
  //     // this.thematics=list.thematics
  //   })
  // }
  public getAllthematic() {
    this.thematic_axisService.getList().subscribe((scalesApiFrom) => {
      // scalesApiFrom.thematic_axiss
      for (let key of scalesApiFrom.thematic_axiss) {
        key.name =  key.name.charAt(0).toUpperCase() +  key.name.slice(1);
      }
      this.thematic_axiss =scalesApiFrom.thematic_axiss
      // console.log(this.thematic_axiss)
    })
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
    })
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      id:[''],
      name: ['', [Validators.required]],
      justification: [''],
      objectives: [''],
      Thematics: this.formBuilder.array([this.formBuilder.group(
        {
          ThematicId:['', [Validators.required]],
          Thematic_axis: ['', [Validators.required]],

      })]),
      resolution: [''],
      Anexo: [''],
    });
  }  

  public onSubmit(e: Event): void {
    e.preventDefault();
    let control = <FormArray>this.form.controls['Thematics']

    let formValue: any = this.form.value;
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
    // let array:LineThematicI[] =[]
    // for (const key of control.value) {
    //   key.ThematicId=key.ThematicId.id
    //   array.push({LineId:key.LineId,ThematicId:key.ThematicId})
    // }
    if(formValue.name != "" 
    // && formValue.justification != "" && 
    // formValue.objectives !="" 
    && formValue.id != undefined && formValue.Thematics.length > 0
    // &&
    // formValue.thematics != ""  &&  
    // formValue.resolution != ""
    ){
      this.bandera=true
      console.log(formValue,'formValue')

    this.lineService.updateItem(formValue.id,formValue).subscribe(
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
                    detail: 'Registro de Linea Actualizado con exito'});
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
            detail: 'Registro de Linea Actualizado con exito'});
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

  getOneCntAccount(id:number) {
    this.lineService.getItem(id).subscribe((cnt_groupFromApi) => {
      console.log(cnt_groupFromApi.line);      
      if(cnt_groupFromApi.line.id != undefined)
      this.form.controls['id'].setValue(cnt_groupFromApi.line.id)
      this.form.controls['name'].setValue(cnt_groupFromApi.line.name)
      if(cnt_groupFromApi.line.LineDetail != undefined){
        this.form.controls['justification'].setValue(cnt_groupFromApi.line.LineDetail.justification)
          this.form.controls['objectives'].setValue(cnt_groupFromApi.line.LineDetail.objectives)
        this.form.controls['resolution'].setValue(cnt_groupFromApi.line.LineDetail.resolution)
      }
      // console.log(cnt_groupFromApi.line.Anexo,'cnt_groupFromApi.line.Anexo')
      if(cnt_groupFromApi.line.Anexo != undefined && cnt_groupFromApi.line.Anexo != null){
        this.mostrarAnexo=cnt_groupFromApi.line.Anexo
        this.BanderaAnexo=false

      }else{
        this.BanderaAnexo=true
        this.mostrarAnexo=null
      }

      
   
      // this.form.controls['thematics'].setValue(cnt_groupFromApi.line.thematics)
    
      // this.thematic()
      this.thematicService.getList().subscribe(list => {
        for (const key of list.thematics) {
          if(key.Thematic_axis_Thematics !== undefined && key.Thematic_axis_Thematics.length > 0){
  
          this.thematics.push(key);
        }
        }
      console.log(this.thematics,'this.thematics');      
      // this.getAllthematic()
      this.thematic_axisService.getList().subscribe((scalesApiFrom) => {
        this.thematic_axiss =scalesApiFrom.thematic_axiss
        console.log(this.thematic_axiss,'this.thematic_axiss');  
        if(cnt_groupFromApi.line.LineThematics?.length != undefined && cnt_groupFromApi.line.LineThematics.length > 0){
          this.agregarThematics(cnt_groupFromApi.line.LineThematics)  
        }
      })

          

         
      })

     
     
      this.displayMaximizable2=true
      this.tabla = false
      
    }, error => console.error(error));
  }
  agregarThematics(LineThematics: LineThematicI[]) {
    
    if(LineThematics.length){
      for (let key of LineThematics) {
        if(key.id != undefined && key.ThematicId != undefined ) {
          let control = <FormArray>this.form.controls['Thematics']
          for (const key2 of this.thematics) {
            console.log('aqui,ok')
            if(key2.id == key.ThematicId && key.status == true){
              console.log('aqui')
              this.lineService.getOnelineThematic(key.id).subscribe((algo2)=>{
                // console.log(algo2.thematic_axis,'thematic_axis')
                control.push(this.formBuilder.group({
                  ThematicId:[key2, [Validators.required]],
                  Thematic_axis:[algo2.thematic_axis, [Validators.required]],
                }))
              })
            }
            
          }
        
            
         


        }
      }
      this.mostrar2= true
      let control = <FormArray>this.form.controls['Thematics']
      control.removeAt(0)
    
      // console.log(control)
    }
  }

  public volver(event: Event){
    this.BanderaAnexo=false
    this.mostrarAnexo=null
    this.AnexoAdjuntado=null
    event.preventDefault
    this.tabla = true
    this.ngOnInit()
    this.displayMaximizable2 = false
    this.thematic_axiss=[]
    this.thematics=[]
   this.bandera=false
   this.filteredCountries=[]


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

  get getThematics() {
    return this.form.get('Thematics') as FormArray;//obtener todos los formularios
  }

  addRoles(event: Event){
    event.preventDefault();
    const control = <FormArray>this.form.controls['Thematics']
      if(control.length == 0 && this.mostrar2 == false){
        control.push(this.formBuilder.group({
          ThematicId:['', [Validators.required]],
          Thematic_axis:['', [Validators.required]],
        }))
      }
      if(control.length >= 1 && this.mostrar2 == true){
        control.push(this.formBuilder.group({
          ThematicId:['', [Validators.required]],
          Thematic_axis:['', [Validators.required]],
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
        Thematic_axis:['', [Validators.required]],
      }))
      }
      // console.log(control)
  }

  // modal

  addTematica(e:Event){
    e.preventDefault()

    this.ref = this.dialogService.open(Create_ThematicComponent, {
      width: '35%',
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
  //     // this.getAllthematic()
  
  //       }
  // });
  // }

 
  onFileChange(event:any) {
    event.preventDefault();
    // let control = <FormArray>this.form.controls['Anexos']
    // console.log(control.value[pointIndex].resolution_convalidation)
    if(this.form.value.Anexo != '' && this.BanderaAnexo == true){
      // console.log('aquii')
      if(event.target.files && event.target.files.length>0){//Identifica si hay archivos
        const file=event.target.files[0];
        this.AnexoAdjuntado=file
            // console.log(this.AnexoAdjuntado,'this.Anexo')
        }
      }
    }
}
