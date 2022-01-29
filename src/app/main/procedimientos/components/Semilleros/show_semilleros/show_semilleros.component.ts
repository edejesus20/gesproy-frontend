import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SeedbedService } from 'src/app/core/services/Procedimientos/Seedbed.service';
import { SeedbedI } from 'src/app/models/institution/seedbed';

@Component({
  selector: 'app-show_semilleros',
  templateUrl: './show_semilleros.component.html',
  styleUrls: ['./show_semilleros.component.css']
})
export class Show_semillerosComponent implements OnInit {
 public seedbeds: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public displayedColumns: string[] = ['id', 'name','createdAt', 'updatedAt'];
  constructor(
    private seedbedService:SeedbedService
    ) { }
  ngOnInit(): void {
    this.getAllScale() 
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.seedbeds.filter = filterValue.trim().toLowerCase();
      if (this.seedbeds.paginator) {
        this.seedbeds.paginator.firstPage();
      }
  }
  getAllScale() {
    this.seedbedService.getList().subscribe((seedbedsApiFrom) => {
      this.seedbeds =new MatTableDataSource<SeedbedI>(seedbedsApiFrom.seedbeds);
      this.seedbeds.paginator = this.paginator;
      this.seedbeds.sort = this.sort;
      // console.log(this.seedbeds);
    }, error => console.error(error));
  }
}
