import { Component, Input } from '@angular/core';
import { CatalogService } from '../catalog-service';
import { IProperty } from '../shared/interfaces/property';
import { UserService } from '../user-service.service';


@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss']
})
export class PropertyItemComponent {

  @Input() property!: IProperty;
  
  constructor(
    private catalogService: CatalogService,
    private userService: UserService
  ) {
    
    
  }
  //onLike(_ownerId: string, _id?: string): void{
  //  let localId = this.userService.getUserData().localId;
  //  console.log('ITS WORKED LIKE', _ownerId, _id);
  //  this.catalogService.like(_ownerId, _id, localId)
  //}


}
