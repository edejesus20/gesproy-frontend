import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_libros',
  templateUrl: './show_libros.component.html',
  styleUrls: ['./show_libros.component.css']
})
export class Show_librosComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
