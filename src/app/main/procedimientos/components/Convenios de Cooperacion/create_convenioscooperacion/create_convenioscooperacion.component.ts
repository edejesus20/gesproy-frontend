import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create_convenioscooperacion',
  templateUrl: './create_convenioscooperacion.component.html',
  styleUrls: ['./create_convenioscooperacion.component.css']
})
export class Create_convenioscooperacionComponent implements OnInit {
  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
