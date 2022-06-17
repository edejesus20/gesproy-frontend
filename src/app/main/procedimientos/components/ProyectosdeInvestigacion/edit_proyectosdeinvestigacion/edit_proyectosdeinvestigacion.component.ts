import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit_proyectosdeinvestigacion',
  templateUrl: './edit_proyectosdeinvestigacion.component.html',
  styleUrls: ['./edit_proyectosdeinvestigacion.component.css']
})
export class Edit_proyectosdeinvestigacionComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true

  }
}
