import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit_consultorias',
  templateUrl: './edit_consultorias.component.html',
  styleUrls: ['./edit_consultorias.component.css']
})
export class Edit_consultoriasComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
