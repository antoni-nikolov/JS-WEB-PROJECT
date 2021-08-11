import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IMessage } from './shared/interfaces/message';
import { IUserDB } from './shared/interfaces/userDB';
import { UserService } from './user-service.service';

@Injectable()
export class MessageService {

  currentMessages!: any;
  key!: string;


  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }


  currentOwner(_id: string, name: string, email:string , message: string){
    this.userService.getUserFromDb(_id)
    .pipe(
      tap(data => this.key = Object.keys(data)[0])
    )
    .subscribe({
      next: (data) => this.currentMessages = Object.values(data)[0].messages,
      error: (err: Error) => console.log(err),
      complete: () => this.addNewMessage(_id, name, email, message),
      
    });
    
  }

  addNewMessage(_id: string, name: string, email:string , message: string){

    this.currentMessages.push({name, email, message})    
  
    const auth = localStorage.getItem('auth');
    let url: string = `https://dream-property-508d3-default-rtdb.europe-west1.firebasedatabase.app/users/${_id}/${this.key}.json`;
    auth ? url += `?auth=${JSON.parse(auth).idToken}` : url;

    const data = {
      messages: this.currentMessages
    }
    this.http.patch<IUserDB>(url, data).subscribe();  
       
  }

  getAllMessage(_ownerId: string){
    let url: string = `https://dream-property-508d3-default-rtdb.europe-west1.firebasedatabase.app/users/${_ownerId}.json`;
    return this.http.get<IUserDB>(url, {withCredentials: false});
  }



}
