import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete_consultorias',
  templateUrl: './delete_consultorias.component.html',
  styleUrls: ['./delete_consultorias.component.css']
})
export class Delete_consultoriasComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
