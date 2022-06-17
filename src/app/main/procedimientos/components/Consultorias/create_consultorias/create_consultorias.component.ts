import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create_consultorias',
  templateUrl: './create_consultorias.component.html',
  styleUrls: ['./create_consultorias.component.css']
})
export class Create_consultoriasComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
