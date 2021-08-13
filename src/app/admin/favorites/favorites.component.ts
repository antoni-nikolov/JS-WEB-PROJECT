import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from 'src/app/catalog-service';
import { IProperty } from 'src/app/shared/interfaces/property';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  properties!: IProperty[] | null;
  localId!: string;
  favorite!: string;

  constructor(
    private catalogService: CatalogService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {

    this.localId = this.userService.getUserData().localId;
    this.favoritePropertiesHandler();

    if (this.route.snapshot.routeConfig?.path == 'favorites') {
      this.favorite = this.route.snapshot.routeConfig?.path;
    }
  }

  favoritePropertiesHandler(): void {
    this.catalogService.getFavorite(this.localId)
      .subscribe({
        next: (data) => {
          if (data) {
            this.properties = Object.values(data);
          } else {
            this.properties = null;
          }
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  deletedFavoriteProperty() {
    this.favoritePropertiesHandler();
  }

  //convertData(data: any): void {
  //  if (data) {
  //    this.properties = Object.keys(data).map(key => ({ _id: key, ...data[key] }));
  //  } else {
  //    this.properties = null;
  //  }
  //}

}
