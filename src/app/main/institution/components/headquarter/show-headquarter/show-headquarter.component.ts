import { Component, OnInit, ViewChild } from '@angular/core';
import { HeadquarterService } from 'src/app/core/services/headquarter/headquarter.service';
import { Observable } from 'rxjs';
import { HeadquarterI } from 'src/app/models/institution/headquarter';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-show-headquarter',
  templateUrl: './show-headquarter.component.html',
  styleUrls: ['./show-headquarter.component.scss']
})
export class ShowHeadquarterComponent implements OnInit {

  public headquarters:any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public displayedColumns: string[] = [
    'id', 
    'name', 
    'cordinatorInvestigation', 
    'createdAt', 
    'updatedAt', 
    
  ];
  
  constructor(private headquarterService: HeadquarterService) { }

  ngOnInit(): void {
    this.getAllHeadquarter()
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.headquarters.filter = filterValue.trim().toLowerCase();
      if (this.headquarters.paginator) {
        this.headquarters.paginator.firstPage();
      }
  }
  getAllHeadquarter() {
    
    this.headquarterService.getList().subscribe((headquartersFromApi) => {
      this.headquarters = new MatTableDataSource<HeadquarterI>(headquartersFromApi.headquarters);
      this.headquarters.paginator = this.paginator;
      this.headquarters.sort = this.sort;
      // console.log(this.programs);
    }, error => console.error(error));


  }
}
