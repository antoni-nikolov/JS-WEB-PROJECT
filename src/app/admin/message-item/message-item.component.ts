import { Component, EventEmitter, Input, Output} from '@angular/core';
import { MessageService } from 'src/app/message.service';
import { IMessage } from 'src/app/shared/interfaces/message';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent {
  @Input() message?: IMessage
  @Output() messageWasDeleted = new EventEmitter();
  @Output() messageWasReaded = new EventEmitter();

  localId!: string;
 

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.localId = this.userService.getUserData().localId
  }


  deleteMessageHandler(messageId: string | undefined){
    this.messageService.deleteMessage(this.localId, messageId!)
    .subscribe({
      next: () => {},
      error: () => {},
      complete: () => {
        this.messageWasDeleted.emit()
      }
    })
  }

  readMessageHandler(messageId: string | undefined){
    this.messageService.reedMessage(this.localId, messageId!).subscribe({
      next: () => {},
      error: () => {},
      complete: () => {
        this.messageWasReaded.emit()
      }
    })  
  }
  

}
