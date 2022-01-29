import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RelationshipService } from 'src/app/core/services/institution/Relationship.service';
import { RelationshipI } from 'src/app/models/institution/relationship';

@Component({
  selector: 'app-show_Relaciones',
  templateUrl: './show_Relaciones.component.html',
  styleUrls: ['./show_Relaciones.component.css']
})
export class Show_RelacionesComponent implements OnInit {

  public relationships: any;
  // public institutions: InstitutionI[]=[];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  // public columns: string[] = ['id', 'name', 'facultieId', 'programCategorieId','createdAt', 'updatedAt'];
  public displayedColumns: string[] = ['id', 'name','createdAt', 'updatedAt'];

  constructor(
    private relationshipService:RelationshipService
    ) { }


  ngOnInit(): void {
    this.getAllScale()
    
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.relationships.filter = filterValue.trim().toLowerCase();
      if (this.relationships.paginator) {
        this.relationships.paginator.firstPage();
      }
  }

  getAllScale() {
    
    this.relationshipService.getList().subscribe((relationshipsApiFrom) => {
      this.relationships =new MatTableDataSource<RelationshipI>(relationshipsApiFrom.relationships);
      this.relationships.paginator = this.paginator;
      this.relationships.sort = this.sort;
      // console.log(this.relationships);
    }, error => console.error(error));
  }

  

}
