import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUserDB } from 'src/app/shared/interfaces/userDB';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {

  subscription = new Subscription();


  localId!: string;
  userInfo!: IUserDB;

  constructor(
    private userService: UserService
  ) {
    this.localId = this.userService.getUserData().localId
    this.userData(this.localId)
  }
  
  userData(localId: string){
    this.subscription.add(
    this.userService.getUserFromDb(localId)
    .subscribe(data => this.userInfo = Object.values(data)[0]));
   }


   ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }

}
