import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create_libros',
  templateUrl: './create_libros.component.html',
  styleUrls: ['./create_libros.component.css']
})
export class Create_librosComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true

  }

}
