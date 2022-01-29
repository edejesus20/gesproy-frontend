import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { ResourcesService } from 'src/app/core/services/usuarios/resources.service';
import { ResourceI } from 'src/app/models/authorization/usr_resource';

@Component({
  selector: 'app-mostrar-resources',
  templateUrl: './mostrar-resources.component.html',
  styleUrls: ['./mostrar-resources.component.css']
})
export class MostrarResourcesComponent implements OnInit {

  public resources: any;
  @Input() displayedColumns: string[] = ['ID','titulo', 'path','method','id_padre','icono','link','Roles'];
  @Input() mostrar:number=0;
  @Output() modificar= new EventEmitter<number>();
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort!: MatSort;
  constructor(
    private resourcesService: ResourcesService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getUsrResource()
  }
  getUsrResource() {
    this.resourcesService.getResource().subscribe((ResourceFromApi) => {
      // this.resources = new MatTableDataSource<ResourceI>(ResourceFromApi.resources);
      // this.resources.paginator = this.paginator;
      // this.resources.sort = this.sort;
      //console.log(this.resources);
    }, error => console.error(error));
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.resources.filter = filterValue.trim().toLowerCase();
      if (this.resources.paginator) {
        this.resources.paginator.firstPage();
      }
  }
  editar(id: number){
    // this.classs$ = this.cntClassService.getclassId$();
    // this.classs$.subscribe(clas_id => id= clas_id);
    this.modificar.emit(id)
    this.router.navigateByUrl(`/usuarios/resource_modificar/${id}`);
  }
  delet(id: number){
    // this.classs$ = this.cntClassService.getclassId$();
    // this.classs$.subscribe(clas_id => id= clas_id);
    this.modificar.emit(id)
    this.router.navigateByUrl(`/usuarios/resource_eliminar/${id}`);
  }

}
