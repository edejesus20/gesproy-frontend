import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_consultorias',
  templateUrl: './show_consultorias.component.html',
  styleUrls: ['./show_consultorias.component.css']
})
export class Show_consultoriasComponent implements OnInit {

 
  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
