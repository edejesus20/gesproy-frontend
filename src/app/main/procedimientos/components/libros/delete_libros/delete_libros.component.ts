import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete_libros',
  templateUrl: './delete_libros.component.html',
  styleUrls: ['./delete_libros.component.css']
})
export class Delete_librosComponent implements OnInit {

  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true

  }

}
