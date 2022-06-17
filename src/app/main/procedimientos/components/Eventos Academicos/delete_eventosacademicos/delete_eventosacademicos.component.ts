import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete_eventosacademicos',
  templateUrl: './delete_eventosacademicos.component.html',
  styleUrls: ['./delete_eventosacademicos.component.css']
})
export class Delete_eventosacademicosComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
