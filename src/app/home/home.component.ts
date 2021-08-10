import { Component } from '@angular/core';
import { CatalogService } from '../catalog-service';
import { IProperty } from '../shared/interfaces/property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  featuredProperties!: IProperty[] | null;
  exclusiveProperties!: IProperty[] | null;


  constructor(
    private catalogService: CatalogService,

  ) {

    this.getAllProperties();
  }

  getAllProperties(): void {
    this.catalogService.getAll().subscribe(data => this.convertData(data));
  }

  convertData<T>(data: T): void {

    let currentData: any = []
    if (data) {

      let result = Object.entries(data)

      result.forEach((el) => {
        for (const iterator in el[1]) {
          currentData.push(Object.assign({ _id: iterator }, el[1][iterator]))
        }
      });

      this.filtredData(currentData);
    }

  }

  filtredData(data: []) {

    let featured = data.filter((x: any) => x.label === 'Featured');
    let exclusive = data.filter((x: any) => x.label === 'Exclusive');

    this.featuredProperties = featured
    this.exclusiveProperties = exclusive

  }

}
