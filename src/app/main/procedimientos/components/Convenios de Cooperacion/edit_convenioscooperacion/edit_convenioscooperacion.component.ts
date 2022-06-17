import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit_convenioscooperacion',
  templateUrl: './edit_convenioscooperacion.component.html',
  styleUrls: ['./edit_convenioscooperacion.component.css']
})
export class Edit_convenioscooperacionComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
