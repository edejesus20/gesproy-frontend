import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show_one_libros',
  templateUrl: './show_one_libros.component.html',
  styleUrls: ['./show_one_libros.component.css']
})
export class Show_one_librosComponent implements OnInit {


  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
