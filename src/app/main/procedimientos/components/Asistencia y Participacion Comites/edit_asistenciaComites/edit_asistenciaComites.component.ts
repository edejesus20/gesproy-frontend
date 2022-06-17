import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit_asistenciaComites',
  templateUrl: './edit_asistenciaComites.component.html',
  styleUrls: ['./edit_asistenciaComites.component.css']
})
export class Edit_asistenciaComitesComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
