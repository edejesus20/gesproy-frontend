import { Component, OnInit, ViewChild } from '@angular/core';

import { ProjetService } from 'src/app/core/services/Procedimientos/projet.service';
import { ProjetI } from 'src/app/models/projet/projet';

@Component({
  selector: 'app-show_proyectosdeinvestigacion',
  templateUrl: './show_proyectosdeinvestigacion.component.html',
  styleUrls: ['./show_proyectosdeinvestigacion.component.css']
})
export class Show_proyectosdeinvestigacionComponent implements OnInit {
  public projets: any;
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public displayedColumns: string[] = ['id', 'name','createdAt', 'updatedAt'];
  constructor(
    private projetService:ProjetService
    ) { }
  ngOnInit(): void {
    this.getAllScale() 
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.projets.filter = filterValue.trim().toLowerCase();
      if (this.projets.paginator) {
        this.projets.paginator.firstPage();
      }
  }
  getAllScale() {
    this.projetService.getList().subscribe((projetsApiFrom) => {
      // this.projets =new MatTableDataSource<ProjetI>(projetsApiFrom.projets);
      // this.projets.paginator = this.paginator;
      // this.projets.sort = this.sort;
      // console.log(this.projets);
    }, error => console.error(error));
  }

}
