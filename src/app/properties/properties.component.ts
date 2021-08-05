import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CatalogService } from '../catalog-service';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

  properties!: any;
  
  constructor(
    private catalogService: CatalogService
    ) {
      
    this.getAllProperties();  
   }

  getAllProperties(): void {
    this.catalogService.getAll().subscribe(data => this.convertData(data));
  }

  convertData(data: any): void{
    let currentData:any = [];
    let result = Object.entries(data)

    result.forEach((el:any) => {
      for (const iterator in el[1]) {
        currentData.push(Object.assign({_id: iterator}, el[1][iterator]))
      }   
    });
    this.properties = currentData;    
  }



}

