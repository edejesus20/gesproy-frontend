import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_one_proyectosdeinvestigacion',
  templateUrl: './show_one_proyectosdeinvestigacion.component.html',
  styleUrls: ['./show_one_proyectosdeinvestigacion.component.css']
})
export class Show_one_proyectosdeinvestigacionComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true

  }

}
