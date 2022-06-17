import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create_educacioncontinuada',
  templateUrl: './create_educacioncontinuada.component.html',
  styleUrls: ['./create_educacioncontinuada.component.css']
})
export class Create_educacioncontinuadaComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
