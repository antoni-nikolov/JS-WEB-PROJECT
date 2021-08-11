import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from 'src/app/shared/interfaces/message';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input() message?: IMessage

  constructor() { 

    console.log(this.message)
  }

  ngOnInit(): void {
  }

  

}
