import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/usuarios/user.service';
let uploadefiles:Array<File>
@Component({
  selector: 'app-create-administrative',
  templateUrl: './create-administrative.component.html',
  styleUrls: ['./create-administrative.component.css']
})
export class CreateAdministrativeComponent implements OnInit {
  displayMaximizable2=true
  private images:any
  public form:FormGroup=this.formBuilder.group({
    file:['', [Validators.required]],
  })
  constructor(
    private userService:UserService,
    private formBuilder: FormBuilder,
    private messageService:MessageService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }
  onFileChange(e: Event) {
    e.preventDefault()
    const algo= (e.target as HTMLInputElement)
    if(algo.files){
      if(algo.files.length > 0) {
        const file = algo.files[0]
        this.images = file
        console.log('aqui',this.images)
      }
    }
  }

  public onSubmit() {
    let formData = new FormData();
    formData.append("file",this.images);
    // console.log(formData)
    this.http.post<any>('http://localhost:4000/api/subir',formData).subscribe(
      (res)=> console.log(res),(err)=> console.log(err)
    )
  }

}
