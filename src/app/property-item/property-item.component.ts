import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CatalogService } from '../catalog-service';
import { IProperty } from '../shared/interfaces/property';
import { UserService } from '../user-service.service';


@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss'],
})
export class PropertyItemComponent implements OnDestroy{

  subscription = new Subscription();

  @Input() property!: IProperty;
  @Input() myProperties!: string;
  @Input() favorite!: string;

  @Output() deteteFavorite = new EventEmitter();
  @Output() deteteMyProperty = new EventEmitter();
  localId!: string;
  error!: string;

  constructor(
    private catalogService: CatalogService,
    private userService: UserService

  ) {

    this.localId = this.userService.getUserData().localId

  }

  deleteProperty(_ownerId: string, id: string): void {

    if (_ownerId === this.localId) {
      this.subscription.add(
      this.catalogService.delete(_ownerId, id).subscribe({
        next: () => { },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          this.deteteMyProperty.emit()
        }
      }));
    }
  }


  likeHandler(_ownerId: string, _id: string): void {
    this.subscription.add(
    this.catalogService.getById(_ownerId, _id)
      .subscribe({
        next: (data) => {
          this.catalogService.addFavorite(data, this.localId, _id).subscribe()
        },
        error: (err) => {
          if (err.status == 401) {
            this.error = 'You must be a logged user!';
            
          }
        }
      }));
  }

  unLikeHandler(_id: string): void {
    this.subscription.add(
    this.catalogService.getFavorite(this.localId)
      .subscribe({
        next: (data) => {
          this.findFavoritePropertyAndDelete(data, _id)
        },
        error: (err) => { console.log(err) },
        complete: () => {}
      }));
  }

  findFavoritePropertyAndDelete(data: any, _id: string): void {
    let articles = Object.keys(data).map(key => ({ _key: key, ...data[key] }));
    let articleForDelete = articles.find(a => a._id == _id);

    this.subscription.add(
    this.catalogService.deteleFavoriteById(this.localId, articleForDelete._key)
      .subscribe({
        next: () => { },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          this.deteteFavorite.emit();
        }
      }));
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }



}
