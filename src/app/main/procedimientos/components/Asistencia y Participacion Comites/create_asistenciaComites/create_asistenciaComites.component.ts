import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create_asistenciaComites',
  templateUrl: './create_asistenciaComites.component.html',
  styleUrls: ['./create_asistenciaComites.component.css']
})
export class Create_asistenciaComitesComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
