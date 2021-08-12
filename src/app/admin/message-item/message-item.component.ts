import { Component, Input} from '@angular/core';
import { IMessage } from 'src/app/shared/interfaces/message';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent {

  @Input() message?: IMessage

  classes = [
    'unRead-message'
  ]
  constructor() {}

  seenHandler($event: any){
    let parentElement = $event.target.parentElement;
    
  }
  

}
