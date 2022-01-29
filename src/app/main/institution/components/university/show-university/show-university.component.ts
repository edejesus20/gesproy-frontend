import { Component, OnInit, ViewChild } from '@angular/core';
import { InstitutionService } from 'src/app/core/services/institution/institution.service';
import { Observable } from 'rxjs';
import { InstitutionI } from 'src/app/models/desk/institution';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UniversityService } from 'src/app/core/services/institution/university.service';
import { UniversityI } from 'src/app/models/institution/university';

@Component({
  selector: 'app-show-university',
  templateUrl: './show-university.component.html',
  styleUrls: ['./show-university.component.scss']
})
export class ShowUniversityComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public universitys:any;
  public displayedColumns: string[] = [
    'id', 
    'name', 
    'nit' ,
    'address', 
    'updatedAt' 

  ];
  constructor(private universityService: UniversityService) { }

  ngOnInit(): void {
    this.getOneInstitution()
  }

  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.universitys.filter = filterValue.trim().toLowerCase();
      if (this.universitys.paginator) {
        this.universitys.paginator.firstPage();
      }
  }
  getOneInstitution() {
    this.universityService.getList().subscribe((instititionsFromApi) => {
      this.universitys =new MatTableDataSource<UniversityI>(instititionsFromApi.universitys);
      this.universitys.paginator = this.paginator;
      this.universitys.sort = this.sort;
    }, error => console.error(error));
  }

}
