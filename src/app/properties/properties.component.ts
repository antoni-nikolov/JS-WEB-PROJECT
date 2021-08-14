import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CatalogService } from '../catalog-service';


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnDestroy{

  properties!: [] | null;
  categories: string[] = ['House', 'Apartment', 'Villas', 'Restaurant', 'Hotels', 'Plots'];
  noSearchResults!: boolean;
  queryParam!: string | undefined

  subscription = new Subscription();

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    ) {
      
    this.queryParam = route.snapshot.queryParams.search
    this.getAllProperties();
   
    if (this.queryParam) { this.findByCategory(this.queryParam!); }
    
   }

  getAllProperties(): void {
    this.subscription.add(
    this.catalogService.getAll()
    .subscribe(data => this.convertData(data))
    );
  }

  convertData<T>(data: T): void{
    let currentData: any = []
    if (data) {
      let result = Object.entries(data)

      result.forEach((el) => {
        for (const key in el[1]) {
          currentData.push(Object.assign({_id: key}, el[1][key]))
        }   
      });
      this.properties = currentData; 
    }
  }
  
  
  searchHandler(search: HTMLInputElement): void{
    this.subscription.add(
    this.catalogService.getAll().subscribe({
      next: (data) => {
        this.convertData(data)
      },
      error: (err) => {console.log(err)},
      complete: () => {
        
        let currentData = this.properties
        if (currentData) {
          const filterData: any = currentData.filter((x: any ) => x.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()));
          if (filterData.length == 0) {
            this.properties = null; 
            this.noSearchResults = true
            return
            
          }
          this.properties = filterData;
          this.noSearchResults = false      
        } 
      }
    }));

    
  }

  findByCategory(category: string){
    this.subscription.add(
    this.catalogService.getAll().subscribe({
      next: (data) => {
        this.convertData(data)
      },
      error: (err) => {console.log(err)},
      complete: () => {
        let currentData = this.properties
        if (currentData) {
          const filterData: any = currentData.filter((x: any ) => x.category.toLocaleLowerCase() == category.toLocaleLowerCase());
          if (filterData.length == 0) {
            this.properties = null; 
            return
            
          }
          this.properties = filterData;      
        }
        
      }
    }));
    
    
  }
  allPropertiesHandler(search: HTMLInputElement): void{
    search.value = '';
    this.getAllProperties(); 
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }

}



