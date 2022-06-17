import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_one_convenioscooperacion',
  templateUrl: './show_one_convenioscooperacion.component.html',
  styleUrls: ['./show_one_convenioscooperacion.component.css']
})
export class Show_one_convenioscooperacionComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }
}
