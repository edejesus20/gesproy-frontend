import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete_grupodeInvetigacion',
  templateUrl: './delete_grupodeInvetigacion.component.html',
  styleUrls: ['./delete_grupodeInvetigacion.component.css']
})
export class Delete_grupodeInvetigacionComponent implements OnInit {
  public construccion:string='assets/construccion.jpg'
  public Valorconstruccion:boolean=false
  constructor() { }

  ngOnInit() {
    this.Valorconstruccion=true
  }

}
