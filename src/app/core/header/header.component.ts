import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    get isLogged(): boolean{
      return this.userService.getUserData().isAuthenticated
    }
  
  constructor(
    private userService: UserService,
    private router: Router
    ) {}

  logoutHandler() {
    this.userService.logout();
    this.router.navigate(['/login']);    
  }
}
