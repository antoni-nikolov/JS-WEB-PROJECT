import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProperty } from './shared/interfaces/property';

@Injectable()
export class CatalogService {

  url: string = 'https://dream-property-508d3-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(
    private http: HttpClient,

  ) {

  }

  urlBuilder(resource: string, _id?: string) {

    let baseUrl = `${this.url}${resource}.json`;
    let catalogUrl = `${this.url}/properties/${resource}.json`;
    let ownerUrl = `${this.url}/properties/${resource}.json`;
    let IdUrl = `${this.url}/properties/${resource}/${_id}.json`;
    let DetailsUrl = `${this.url}/properties/${resource}/${_id}.json`;
    let favoriteUrl = `${this.url}/favorites/${resource}.json`;
    let deleteFavoriteUrl = `${this.url}/favorites/${resource}/${_id}.json`;



    const auth = sessionStorage.getItem('auth');
    auth ? catalogUrl += `?auth=${JSON.parse(auth).idToken}` : catalogUrl;
    auth ? IdUrl += `?auth=${JSON.parse(auth).idToken}` : IdUrl;
    auth ? favoriteUrl += `?auth=${JSON.parse(auth).idToken}` : favoriteUrl;
    auth ? deleteFavoriteUrl += `?auth=${JSON.parse(auth).idToken}` : deleteFavoriteUrl;


    return {
      baseUrl,
      catalogUrl,
      ownerUrl,
      IdUrl,
      DetailsUrl,
      favoriteUrl,
      deleteFavoriteUrl
    }
  }

  create(data: {}, localId: string) {
    let article = Object.assign({ _ownerId: localId, likes: [{ test: 1 }] }, data)
    return this.http.post<IProperty>(`${this.urlBuilder(`${localId}`).catalogUrl}`, article);
  }

  getAll() {
    return this.http.get<IProperty[]>(`${this.urlBuilder('properties').baseUrl}`, { withCredentials: false });
  }

  getMy(_id: string) {
    return this.http.get<IProperty[]>(`${this.urlBuilder(_id).ownerUrl}`, { withCredentials: false });
  }

  getById(_ownerId: string, _id: string) {
    return this.http.get<IProperty>(`${this.urlBuilder(_ownerId, _id).DetailsUrl}`)

  }

  delete(_ownerId: string, _id: string) {
    return this.http.delete<IProperty>(`${this.urlBuilder(_ownerId, _id).IdUrl}`)

  }

  edit(_ownerId: string, _id?: string, data?: {}) {
    return this.http.patch<IProperty>(`${this.urlBuilder(_ownerId, _id).IdUrl}`, data)

  }

  addFavorite(data: IProperty, localId: string, propertyId: string) {
    
    let property = Object.assign({ _id: propertyId }, data)
    return this.http.post<IProperty>(`${this.urlBuilder(`${localId}`).favoriteUrl}`, property);

  }

  getFavorite(localId: string) {
    return this.http.get<IProperty[]>(`${this.urlBuilder(`${localId}`).favoriteUrl}`, { withCredentials: false });

  }

  deteleFavoriteById(localId: string, propertyId: string) {  
    return this.http.delete<IProperty>(`${this.urlBuilder(localId, propertyId).deleteFavoriteUrl}`);

  }



}
