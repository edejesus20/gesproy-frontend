import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GroupService } from 'src/app/core/services/Procedimientos/group.service';
import { GroupI } from 'src/app/models/institution/group';

@Component({
  selector: 'app-show_grupodeInvetigacion',
  templateUrl: './show_grupodeInvetigacion.component.html',
  styleUrls: ['./show_grupodeInvetigacion.component.css']
})
export class Show_grupodeInvetigacionComponent implements OnInit {
  public groups: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public displayedColumns: string[] = ['id', 'name','createdAt', 'updatedAt'];
  constructor(
    private groupService:GroupService
    ) { }
  ngOnInit(): void {
    this.getAllScale() 
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.groups.filter = filterValue.trim().toLowerCase();
      if (this.groups.paginator) {
        this.groups.paginator.firstPage();
      }
  }
  getAllScale() {
    this.groupService.getList().subscribe((groupsApiFrom) => {
      this.groups =new MatTableDataSource<GroupI>(groupsApiFrom.groups);
      this.groups.paginator = this.paginator;
      this.groups.sort = this.sort;
      // console.log(this.groups);
    }, error => console.error(error));
  }

}
