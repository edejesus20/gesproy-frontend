import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input() image: string = '';
  @Input() nombre: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
