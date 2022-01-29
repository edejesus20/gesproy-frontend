import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/core/services/usuarios/roles.service';
import { RoleI } from 'src/app/models/authorization/usr_roles';

@Component({
  selector: 'app-mostrar-rols',
  templateUrl: './mostrar-rols.component.html',
  styleUrls: ['./mostrar-rols.component.css']
})
export class MostrarRolsComponent implements OnInit {


  public roles: any;
  @Input() displayedColumns: string[] = ['ID', 'name'];
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort!: MatSort;
  constructor(
    private rolesService: RolesService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getUsrRoles()
  }
  getUsrRoles() {
    this.rolesService.getRole().subscribe((rolesFromApi) => {
      // this.roles = new MatTableDataSource<RoleI>(rolesFromApi.roles);
      // this.roles.paginator = this.paginator;
      // this.roles.sort = this.sort;
      //console.log(this.roles);
    }, error => console.error(error));
  }

  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.roles.filter = filterValue.trim().toLowerCase();
      if (this.roles.paginator) {
        this.roles.paginator.firstPage();
      }
  }
  editar(id: number){
    // this.classs$ = this.cntClassService.getclassId$();
    // this.classs$.subscribe(clas_id => id= clas_id);
    this.modificar.emit(id)
    this.router.navigateByUrl(`/usuarios/role_modificar/${id}`);
  }
  delet(id: number){
    // this.classs$ = this.cntClassService.getclassId$();
    // this.classs$.subscribe(clas_id => id= clas_id);
    this.modificar.emit(id)
    this.router.navigateByUrl(`/usuarios/role_eliminar/${id}`);
  }
}
