import { Component, Input, SimpleChanges, } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


    isAuthenticated: boolean = false
  
  constructor(
    private userService: UserService,
    private router: Router
    ) { 
      
    this.isAuthenticated = Boolean(this.userService.getUserData().isAuthenticated)
 
  }

  logoutHandler() {
    this.userService.logout();
    this.isAuthenticated = false
    this.router.navigate(['/login']);
    
  }

  ngOnChanges(simpleChenges: SimpleChanges): void {
    console.log(simpleChenges);
    
  }




}
