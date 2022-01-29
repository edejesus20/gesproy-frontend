import { Component, OnInit, ViewChild } from '@angular/core';

import { TrainingsService } from 'src/app/core/services/institution/trainings.service';
import { TrainingI } from 'src/app/models/institution/training';

@Component({
  selector: 'app-show_capacitacion',
  templateUrl: './show_capacitacion.component.html',
  styleUrls: ['./show_capacitacion.component.css']
})
export class Show_capacitacionComponent implements OnInit {
  public trainings: any;
  // public institutions: InstitutionI[]=[];
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort!: MatSort;
  // public columns: string[] = ['id', 'name', 'facultieId', 'programCategorieId','createdAt', 'updatedAt'];
  public displayedColumns: string[] = ['id', 'name','createdAt', 'updatedAt'];

  constructor(
    private trainingsService:TrainingsService
    ) { }


  ngOnInit(): void {
    this.getAllScale()
    
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.trainings.filter = filterValue.trim().toLowerCase();
      if (this.trainings.paginator) {
        this.trainings.paginator.firstPage();
      }
  }

  getAllScale() {
    
    this.trainingsService.getList().subscribe((trainingsApiFrom) => {
      // this.trainings =new MatTableDataSource<TrainingI>(trainingsApiFrom.trainings);
      // this.trainings.paginator = this.paginator;
      // this.trainings.sort = this.sort;
      // console.log(this.trainings);
    }, error => console.error(error));
  }

  
}
