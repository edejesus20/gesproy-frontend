import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryGroupService } from 'src/app/core/services/institution/CategoryGroup.service';
import { CategoryGroupI } from 'src/app/models/institution/category';

@Component({
  selector: 'app-show_CategoriaGrupos',
  templateUrl: './show_CategoriaGrupos.component.html',
  styleUrls: ['./show_CategoriaGrupos.component.css']
})
export class Show_CategoriaGruposComponent implements OnInit {

  public categoryGroups: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public displayedColumns: string[] = ['id', 'name','date','Group','createdAt', 'updatedAt'];
  constructor(
    private categoryGroupService:CategoryGroupService
    ) { }
  ngOnInit(): void {
    this.getAllScale() 
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.categoryGroups.filter = filterValue.trim().toLowerCase();
      if (this.categoryGroups.paginator) {
        this.categoryGroups.paginator.firstPage();
      }
  }
  getAllScale() {
    this.categoryGroupService.getList().subscribe((categoryGroupsApiFrom) => {
      this.categoryGroups =new MatTableDataSource<CategoryGroupI>(categoryGroupsApiFrom.categoryGroups);
      this.categoryGroups.paginator = this.paginator;
      this.categoryGroups.sort = this.sort;
      // console.log(this.categoryGroups);
    }, error => console.error(error));
  }
}
