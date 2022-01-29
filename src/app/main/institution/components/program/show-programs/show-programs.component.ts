import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgramService } from 'src/app/core/services/program/program.service';
import { ProgramI } from 'src/app/models/institution/program';



@Component({
  selector: 'app-show-programs',
  templateUrl: './show-programs.component.html',
  styleUrls: ['./show-programs.component.scss']
})
export class ShowProgramsComponent implements OnInit {

  public programs: any;
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public displayedColumns: string[] = [
    'id', 
    'name', 
    'facultyId' ,
    'categoria',
    'createdAt', 
    'updatedAt', 

  ];

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.getAllProgram()
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.programs.filter = filterValue.trim().toLowerCase();
      if (this.programs.paginator) {
        this.programs.paginator.firstPage();
      }
  }

  getAllProgram() {
      
    
    this.programService.getList().subscribe((programsFromApi) => {
      // this.programs =new MatTableDataSource<ProgramI>( programsFromApi.programs);
      // this.programs.paginator = this.paginator;
      // this.programs.sort = this.sort;
      // console.log(this.programs);
    }, error => console.error(error));

  }


}
