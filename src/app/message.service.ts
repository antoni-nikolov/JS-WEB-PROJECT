import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage } from './shared/interfaces/message';

@Injectable()
export class MessageService {

  errors!: string;

  urlBuilder(ownerId: string, messageId?: string){
    let postMessagesUrl: string = `https://dream-property-508d3-default-rtdb.europe-west1.firebasedatabase.app/messages/${ownerId}.json`;
    let delMessagesUrl: string = `https://dream-property-508d3-default-rtdb.europe-west1.firebasedatabase.app/messages/${ownerId}/${messageId}.json`;
    let editMessagesUrl: string = `https://dream-property-508d3-default-rtdb.europe-west1.firebasedatabase.app/messages/${ownerId}/${messageId}.json`;

    const auth = localStorage.getItem('auth');
    auth ? postMessagesUrl += `?auth=${JSON.parse(auth).idToken}` : postMessagesUrl;
    auth ? delMessagesUrl += `?auth=${JSON.parse(auth).idToken}` : delMessagesUrl;
    auth ? editMessagesUrl += `?auth=${JSON.parse(auth).idToken}` : editMessagesUrl;



    return {
      postMessagesUrl,
      delMessagesUrl,
      editMessagesUrl
      
    }
  }
  
  constructor(
    private http: HttpClient,
    ) {}


  sendMessage(ownerId: string , name: string, email: string, message: string){
    return this.http.post<IMessage>(this.urlBuilder(ownerId).postMessagesUrl, {name, email, message, class: 'unRead-message'} )
  }


  getAllMessages(localId: string){
    return this.http.get<IMessage[]>(this.urlBuilder(localId).postMessagesUrl)
  }

  deleteMessage(localId: string, messageId: string){
    return this.http.delete<IMessage>(this.urlBuilder(localId, messageId).delMessagesUrl)
  }

  reedMessage(localId: string, messageId: string){
    const data = {
      class: 'reed-message'
    }
    return this.http.patch<IMessage>(this.urlBuilder(localId, messageId).editMessagesUrl, data)
  }

}
