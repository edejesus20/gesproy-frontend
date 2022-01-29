import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { InstitutionI } from 'src/app/models/desk/institution';
import { FacultyI } from 'src/app/models/institution/faculty';

@Component({
  selector: 'app-show-faculties',
  templateUrl: './show-faculties.component.html',
  styleUrls: ['./show-faculties.component.scss']
})
export class ShowFacultiesComponent implements OnInit {

  public faculties: any;
  // public institutions: InstitutionI[]=[];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  // public columns: string[] = ['id', 'name', 'facultieId', 'programCategorieId','createdAt', 'updatedAt'];
  public displayedColumns: string[] = ['id', 'name','Administrative','Ocupation','createdAt', 'updatedAt'];

  constructor(
    private facultyService: FacultyService
    ) { }


  ngOnInit(): void {
    this.getAllFaculty()
    
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.faculties.filter = filterValue.trim().toLowerCase();
      if (this.faculties.paginator) {
        this.faculties.paginator.firstPage();
      }
  }

  getAllFaculty() {
    
    this.facultyService.getList().subscribe((facultiesFromApi) => {
      this.faculties =new MatTableDataSource<FacultyI>(facultiesFromApi.facultys);
      this.faculties.paginator = this.paginator;
      this.faculties.sort = this.sort;
      console.log(this.faculties);
    }, error => console.error(error));
  }

  

}
