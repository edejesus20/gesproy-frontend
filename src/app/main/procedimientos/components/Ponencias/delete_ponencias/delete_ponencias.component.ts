import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete_ponencias',
  templateUrl: './delete_ponencias.component.html',
  styleUrls: ['./delete_ponencias.component.css']
})
export class Delete_ponenciasComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
