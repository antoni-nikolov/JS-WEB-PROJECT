import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProperty } from './shared/interfaces/property';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  url: string = 'https://dream-property-508d3-default-rtdb.europe-west1.firebasedatabase.app/';
  
  constructor(
    private http: HttpClient,

    ){
     
    }
  
  urlBuilder(resource: string, _id?: string) {
  
    let baseUrl = `${this.url}${resource}.json`;
    let catalogUrl = `${this.url}/properties/${resource}.json`;
    let ownerUrl = `${this.url}/properties/${resource}.json`;
    let IdUrl = `${this.url}/properties/${resource}/${_id}.json`;


    const auth = localStorage.getItem('auth');
    auth ? catalogUrl += `?auth=${JSON.parse(auth).idToken}` : catalogUrl;

    console.log('Catalog URl, ', baseUrl);
    
    return {
      baseUrl,
      catalogUrl,
      ownerUrl,
      IdUrl
    }
  }

  create(data: {}, localId: string) {    
    let article = Object.assign({ _ownerId: localId, likes: [{test: 1}] }, data)
    return this.http.post<IProperty>(`${this.urlBuilder(`${localId}`).catalogUrl}`, article);    
  }

  getAll(){
    return this.http.get(`${this.urlBuilder('properties').baseUrl}`, {withCredentials: false});
  }
 
  getMy(_id: string){
    return this.http.get<IProperty>(`${this.urlBuilder(_id).ownerUrl}`, {withCredentials: false});
  }

  getById(_ownerId: string, _id: string ){
    return this.http.get<IProperty>(`${this.urlBuilder(_ownerId, _id).IdUrl}`)

  }

  //edit(_ownerId: string, _id?: string, data?: any){
  //  this.http.patch<IProperty>(`${this.urlBuilder(_ownerId, _id).IdUrl}`, data)
//
  //}

  //like(_ownerId: string, _id?: string, user?: string): void{
  //  
  //  this.http.get<IProperty>(`${this.urlBuilder(_ownerId, _id).IdUrl}`, {withCredentials: false})
  //  .subscribe(data => this.validate(data.likes, user!))
  //  
  //}
//
  //validate(data: any, user: string): void {
//
  //  console.log(data);
  //  data = data.push({_id: user})
  //  
  //}
    
}
