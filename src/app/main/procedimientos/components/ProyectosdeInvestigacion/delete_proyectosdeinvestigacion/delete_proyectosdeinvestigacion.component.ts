import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete_proyectosdeinvestigacion',
  templateUrl: './delete_proyectosdeinvestigacion.component.html',
  styleUrls: ['./delete_proyectosdeinvestigacion.component.css']
})
export class Delete_proyectosdeinvestigacionComponent implements OnInit {
  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true

  }

}
