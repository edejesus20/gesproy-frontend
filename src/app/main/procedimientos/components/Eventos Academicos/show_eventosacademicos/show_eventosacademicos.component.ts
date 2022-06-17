import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_eventosacademicos',
  templateUrl: './show_eventosacademicos.component.html',
  styleUrls: ['./show_eventosacademicos.component.css']
})
export class Show_eventosacademicosComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
