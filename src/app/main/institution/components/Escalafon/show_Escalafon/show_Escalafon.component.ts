import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ScaleService } from 'src/app/core/services/institution/Scale.service';
import { ScaleI } from 'src/app/models/institution/scale';

@Component({
  selector: 'app-show_Escalafon',
  templateUrl: './show_Escalafon.component.html',
  styleUrls: ['./show_Escalafon.component.css']
})
export class Show_EscalafonComponent implements OnInit {

  public scales: any;
  // public institutions: InstitutionI[]=[];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  // public columns: string[] = ['id', 'name', 'facultieId', 'programCategorieId','createdAt', 'updatedAt'];
  public displayedColumns: string[] = ['id', 'name','createdAt', 'updatedAt'];

  constructor(
    private scaleService:ScaleService
    ) { }


  ngOnInit(): void {
    this.getAllScale()
    
  }
  Buscar(event: Event){
    event.preventDefault();
      const filterValue = (event.target as HTMLInputElement).value;
      this.scales.filter = filterValue.trim().toLowerCase();
      if (this.scales.paginator) {
        this.scales.paginator.firstPage();
      }
  }

  getAllScale() {
    
    this.scaleService.getList().subscribe((scalesApiFrom) => {
      this.scales =new MatTableDataSource<ScaleI>(scalesApiFrom.scales);
      this.scales.paginator = this.paginator;
      this.scales.sort = this.sort;
      // console.log(this.scales);
    }, error => console.error(error));
  }

  

}
