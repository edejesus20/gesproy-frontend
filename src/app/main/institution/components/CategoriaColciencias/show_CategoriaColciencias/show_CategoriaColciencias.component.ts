import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColcienciaCategoryService } from 'src/app/core/services/institution/ColcienciaCategory.service';
import { ColcienciaCategoryI } from 'src/app/models/institution/colciencias_category';

@Component({
  selector: 'app-show_CategoriaColciencias',
  templateUrl: './show_CategoriaColciencias.component.html',
  styleUrls: ['./show_CategoriaColciencias.component.css']
})
export class Show_CategoriaColcienciasComponent implements OnInit {
  public colcienciaCategorys: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public displayedColumns: string[] = ['id', 'name','createdAt', 'updatedAt'];
  constructor(
    private colcienciaCategoryService:ColcienciaCategoryService
    ) { }
  ngOnInit(): void {
    this.getAllScale() 
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.colcienciaCategorys.filter = filterValue.trim().toLowerCase();
      if (this.colcienciaCategorys.paginator) {
        this.colcienciaCategorys.paginator.firstPage();
      }
  }
  getAllScale() {
    this.colcienciaCategoryService.getList().subscribe((colcienciaCategorysApiFrom) => {
      this.colcienciaCategorys =new MatTableDataSource<ColcienciaCategoryI>(colcienciaCategorysApiFrom.colcienciaCategorys);
      this.colcienciaCategorys.paginator = this.paginator;
      this.colcienciaCategorys.sort = this.sort;
      // console.log(this.colcienciaCategorys);
    }, error => console.error(error));
  }
}
