import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/message.service';
import { IMessage } from 'src/app/shared/interfaces/message';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnDestroy{
  
  subscription = new Subscription();

  localId!: string;
  messages!: IMessage[] | null;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { 

    this.localId = this.userService.getUserData().localId;
    this.messageHandler();

  }

  messageHandler(): void{
    this.subscription.add(
    this.messageService.getAllMessages(this.localId)
    .subscribe({
      next: (data) => {
        this.messages = this.convertData(data)
      },
      error: (err) => {
        console.log(err);
      }
    }));
  }

  convertData(data: any) {    
    if (data) {
      return Object.keys(data).map(key => ({ _id: key, ...data[key]}));
    } else {
      return null;
    }
  }

  refreshMessages(){
    this.messageHandler();    
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  

}
