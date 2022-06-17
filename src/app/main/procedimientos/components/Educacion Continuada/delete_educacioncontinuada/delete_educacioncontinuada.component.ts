import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete_educacioncontinuada',
  templateUrl: './delete_educacioncontinuada.component.html',
  styleUrls: ['./delete_educacioncontinuada.component.css']
})
export class Delete_educacioncontinuadaComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
