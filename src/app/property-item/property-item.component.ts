import { Component, Input } from '@angular/core';
import { IProperty } from '../shared/interfaces/property';


@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss']
})
export class PropertyItemComponent {

  @Input() property!: IProperty;
  @Input() path!: string;
  @Input() deleteProperty!: Function
  
  constructor(
    
  ) {
    
    
  }
  //onLike(_ownerId: string, _id?: string): void{
  //  let localId = this.userService.getUserData().localId;
  //  console.log('ITS WORKED LIKE', _ownerId, _id);
  //  this.catalogService.like(_ownerId, _id, localId)
  //}


}
