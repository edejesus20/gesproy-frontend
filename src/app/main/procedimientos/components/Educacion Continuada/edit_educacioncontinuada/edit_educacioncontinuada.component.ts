import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit_educacioncontinuada',
  templateUrl: './edit_educacioncontinuada.component.html',
  styleUrls: ['./edit_educacioncontinuada.component.css']
})
export class Edit_educacioncontinuadaComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
