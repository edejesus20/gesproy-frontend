import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit_libros',
  templateUrl: './edit_libros.component.html',
  styleUrls: ['./edit_libros.component.css']
})
export class Edit_librosComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true

  }

}
