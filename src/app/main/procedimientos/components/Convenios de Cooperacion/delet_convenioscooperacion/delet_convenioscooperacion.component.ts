import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delet_convenioscooperacion',
  templateUrl: './delet_convenioscooperacion.component.html',
  styleUrls: ['./delet_convenioscooperacion.component.css']
})
export class Delet_convenioscooperacionComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
