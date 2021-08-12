import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from 'src/app/catalog-service';
import { IProperty } from 'src/app/shared/interfaces/property';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

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

  ngOnInit(): void {
  }

  favoritePropertiesHandler() {
    this.catalogService.getFavorite(this.localId)
      .subscribe(data => this.convertData(data))
  }

  convertData(data: any) {
    if (data) {
      this.properties = Object.keys(data).map(key => ({ _id: key, ...data[key] }));
    }
  }

}
