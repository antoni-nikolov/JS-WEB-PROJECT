import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from 'src/app/catalog-service';
import { IProperty } from 'src/app/shared/interfaces/property';
import { UserService } from 'src/app/user-service.service';


@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss']
})
export class MyPropertiesComponent implements OnDestroy {
  properties!: IProperty[] | null;
  localId!: string;
  myProperties!: string | undefined;

  constructor(
    private catalogService: CatalogService,
    private userService: UserService,
    private route: ActivatedRoute,

  ) {

    this.localId = this.userService.getUserData().localId;
    this.getMyProperties();
    
    if (this.route.snapshot.routeConfig?.path == 'my-properties') {
      this.myProperties = this.route.snapshot.routeConfig?.path;
    }
    
  }
  getMyProperties(): void {
    this.catalogService.getMy(this.localId).subscribe(data => this.convertData(data));
  }

  convertData(data: any) {
    if (data) {
      this.properties = Object.keys(data).map(key => ({ _id: key, ...data[key]}));
    }
  }

  deleteProperty(_ownerId:string, id:string): void {
    console.log('Delete it WORKS');
    
    let localId = this.userService.getUserData().localId;

    if (_ownerId === localId) {
      this.catalogService.delete(_ownerId, id).subscribe({
        next: () => {},
        error: (err) => {
          console.log(err)
        }
      });
    }
    
  }

  ngOnDestroy(): void{
  
    
  }

}
