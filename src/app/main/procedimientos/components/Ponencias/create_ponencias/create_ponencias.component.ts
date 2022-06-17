import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create_ponencias',
  templateUrl: './create_ponencias.component.html',
  styleUrls: ['./create_ponencias.component.css']
})
export class Create_ponenciasComponent implements OnInit {
  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
