import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_one_eventosacademicos',
  templateUrl: './show_one_eventosacademicos.component.html',
  styleUrls: ['./show_one_eventosacademicos.component.css']
})
export class Show_one_eventosacademicosComponent implements OnInit {


  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
