import { Component, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MessageService } from 'src/app/message.service';
import { IMessage } from 'src/app/shared/interfaces/message';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  localId!: string;
  messages!: IMessage[];

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) { 

    this.localId = this.userService.getUserData().localId;
    this.messageHandler();

  }

  messageHandler(){
    this.messageService.getAllMessage(this.localId)
    .subscribe(data => this.messages = this.messages = Object.values(data)[0].messages)
  }

  ngOnInit(): void {
    
  }
  

}
