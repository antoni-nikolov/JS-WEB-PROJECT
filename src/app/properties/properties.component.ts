import { Component } from '@angular/core';
import { CatalogService } from '../catalog-service';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent {

  properties!: [] | null;
  
  constructor(
    private catalogService: CatalogService
    ) {
      
    this.getAllProperties();  
   }

  getAllProperties(): void {
    this.catalogService.getAll().subscribe(data => this.convertData(data));
  }

  convertData<T>(data: T): void{

    let currentData: any = []

    if (data) {
      let result = Object.entries(data)

      result.forEach((el) => {
        for (const iterator in el[1]) {
          currentData.push(Object.assign({_id: iterator}, el[1][iterator]))
        }   
      });
      
      this.properties = currentData; 
    }
    //return currentData
  }
  
  
  searchHandler(search: HTMLInputElement): void{

    const query = search.value;
    let currentData = this.properties

    if (currentData) {
      const filterData: any = currentData.filter((x: any ) => x.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
      this.properties = filterData;
      
    }
    
    //search.value = '';
    //this.catalogService.getAll().subscribe(data => this.convertData(data));
  }

  allPropertiesHandler(){
    this.getAllProperties(); 
  }


}



