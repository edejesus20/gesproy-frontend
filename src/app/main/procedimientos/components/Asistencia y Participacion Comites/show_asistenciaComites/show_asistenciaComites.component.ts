import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_asistenciaComites',
  templateUrl: './show_asistenciaComites.component.html',
  styleUrls: ['./show_asistenciaComites.component.css']
})
export class Show_asistenciaComitesComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
