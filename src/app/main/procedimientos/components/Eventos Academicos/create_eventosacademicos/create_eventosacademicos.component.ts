import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create_eventosacademicos',
  templateUrl: './create_eventosacademicos.component.html',
  styleUrls: ['./create_eventosacademicos.component.css']
})
export class Create_eventosacademicosComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
