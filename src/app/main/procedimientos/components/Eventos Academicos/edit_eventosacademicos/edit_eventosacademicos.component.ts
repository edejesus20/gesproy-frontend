import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit_eventosacademicos',
  templateUrl: './edit_eventosacademicos.component.html',
  styleUrls: ['./edit_eventosacademicos.component.css']
})
export class Edit_eventosacademicosComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
