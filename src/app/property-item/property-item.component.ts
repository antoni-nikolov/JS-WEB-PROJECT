import { Component, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
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
  @Input() myProperties!: string;
  @Input() favorite!: string;
  @Input() deleteProperty!: Function

  localId!: string

  constructor(
    private catalogService: CatalogService,
    private userService: UserService

  ) {

    this.localId = this.userService.getUserData().localId

   }

  likeHandler(_ownerId: string, _id: string) {
    this.catalogService.getById(_ownerId, _id)
    .subscribe({
        next: (data) => {
          this.catalogService.addFavorite(data, this.localId, _id).subscribe()
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  unLikeHandler(_id: string){
    this.catalogService.getFavorite(this.localId)
    .subscribe(data => this.findArticleForDelete(data, _id))
    
  }

  findArticleForDelete(data: any, _id: string){
    let articles = Object.keys(data).map(key => ({ _key: key, ...data[key]}));
    let articleForDelete = articles.find(a => a._id == _id)
    this.catalogService.deteleFavoriteById(this.localId, articleForDelete._key)
    .subscribe({
      next: () => {},
      error: (err) => {
        console.log(err)
      }
    })
  }

}
