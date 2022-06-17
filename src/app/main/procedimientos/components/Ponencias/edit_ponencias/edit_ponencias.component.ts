import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit_ponencias',
  templateUrl: './edit_ponencias.component.html',
  styleUrls: ['./edit_ponencias.component.css']
})
export class Edit_ponenciasComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
