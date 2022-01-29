import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/usuarios/user.service';
import { UserI } from 'src/app/models/authorization/usr_User';
import { PersonI } from 'src/app/models/user/person';

@Component({
  selector: 'app-mostrar-users',
  templateUrl: './mostrar-users.component.html',
  styleUrls: ['./mostrar-users.component.css']
})
export class MostrarUsersComponent implements OnInit {
  
  public users:any;
  @Input() displayedColumns: string[] = ['Identificacion','fullName','username','email','Rol'];
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort!: MatSort;
  constructor(
    private userService: UserService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getUser()
  }
  getUser() {
    this.userService.getUser().subscribe((userFromApi) => {
      console.log(userFromApi.users)
      // this.users = new MatTableDataSource<PersonI>(userFromApi.users);
      // this.users.paginator = this.paginator;
      // this.users.sort = this.sort;
      //console.log(this.users);
    }, error => console.error(error));
  }

  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.users.filter = filterValue.trim().toLowerCase();
      if (this.users.paginator) {
        this.users.paginator.firstPage();
      }
  }
  editar(id: number){
    // this.classs$ = this.cntClassService.getclassId$();
    // this.classs$.subscribe(clas_id => id= clas_id);
    this.modificar.emit(id)
    this.router.navigateByUrl(`/usuarios/user_modificar/${id}`);
  }
  delet(id: number){
    // this.classs$ = this.cntClassService.getclassId$();
    // this.classs$.subscribe(clas_id => id= clas_id);
    this.modificar.emit(id)
    this.router.navigateByUrl(`/usuarios/user_eliminar/${id}`);
  }
}
