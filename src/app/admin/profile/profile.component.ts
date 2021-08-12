import { Component } from '@angular/core';
import { IUserDB } from 'src/app/shared/interfaces/userDB';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  localId!: string;
  userInfo!: IUserDB;

  constructor(
    private userService: UserService
  ) {
    this.localId = this.userService.getUserData().localId
    this.userData(this.localId)
  }
  
  userData(localId: string){
    this.userService.getUserFromDb(localId)
    .subscribe(data => this.userInfo = Object.values(data)[0])
   }

}
