import { Component } from '@angular/core';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  userData!: any;

  constructor(
    private userService: UserService,
  ) {this.userData = this.userService.getUserData();}
  
}
