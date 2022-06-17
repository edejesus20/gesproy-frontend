import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete_asistenciaComites',
  templateUrl: './delete_asistenciaComites.component.html',
  styleUrls: ['./delete_asistenciaComites.component.css']
})
export class Delete_asistenciaComitesComponent implements OnInit {
  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
