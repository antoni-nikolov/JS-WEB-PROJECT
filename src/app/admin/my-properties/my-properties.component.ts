import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/catalog-service';
import { UserService } from 'src/app/user-service.service';


@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss']
})
export class MyPropertiesComponent {


  properties!: any;
  localId!: string;

  constructor(
    private catalogService: CatalogService,
    private userService: UserService
  ) {

    this.localId = this.userService.getUserData().localId;
    this.getMyProperties();
  }


  getMyProperties(): void {

    this.catalogService.getMy(this.localId).subscribe(data => this.convertData(data));
  }

  convertData(data: any) {
    this.properties  = Object.keys(data).map(key => ({ _id: key, ...data[key]}));
  }

}
