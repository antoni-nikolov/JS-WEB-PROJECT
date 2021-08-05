import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  username!: string 
  userEmail!: string
  isAuthenticated!: boolean

  constructor(
    private userService: UserService,
  ) {

    this.username = this.userService.getUserData().displayName;
    this.userEmail = this.userService.getUserData().email;
    this.isAuthenticated = Boolean(this.userService.getUserData().isAuthenticated)
   }
  
 

  ngOnInit(): void {
  }



}
