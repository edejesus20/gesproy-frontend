import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_one_asistenciaComites',
  templateUrl: './show_one_asistenciaComites.component.html',
  styleUrls: ['./show_one_asistenciaComites.component.css']
})
export class Show_one_asistenciaComitesComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
