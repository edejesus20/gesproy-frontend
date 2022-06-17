import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_convenioscooperacion',
  templateUrl: './show_convenioscooperacion.component.html',
  styleUrls: ['./show_convenioscooperacion.component.css']
})
export class Show_convenioscooperacionComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
