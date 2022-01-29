import { Component, OnInit, ViewChild } from '@angular/core';

import { ScaleService } from 'src/app/core/services/institution/Scale.service';
import { ScaleI } from 'src/app/models/institution/scale';

@Component({
  selector: 'app-create_Escalafon',
  templateUrl: './create_Escalafon.component.html',
  styleUrls: ['./create_Escalafon.component.css']
})
export class Create_EscalafonComponent implements OnInit {

  public scales: any;
  // public institutions: InstitutionI[]=[];
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort!: MatSort;
  // public columns: string[] = ['id', 'name', 'facultieId', 'programCategorieId','createdAt', 'updatedAt'];
  public displayedColumns: string[] = ['id', 'name','createdAt', 'updatedAt'];

  constructor(
    private scaleService:ScaleService
    ) { }


  ngOnInit(): void {
    this.getAllFaculty()
    
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.scales.filter = filterValue.trim().toLowerCase();
      if (this.scales.paginator) {
        this.scales.paginator.firstPage();
      }
  }

  getAllFaculty() {
    
    this.scaleService.getList().subscribe((scalesApiFrom) => {
      // this.scales =new MatTableDataSource<ScaleI>(scalesApiFrom.scales);
      // this.scales.paginator = this.paginator;
      // this.scales.sort = this.sort;
      // console.log(this.scales);
    }, error => console.error(error));
  }

  
}
