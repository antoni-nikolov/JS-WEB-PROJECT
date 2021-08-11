import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from '../../user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  error!: string | null

  constructor(
    private userService: UserService,
    private router: Router
  ) {}
    
  
  registerHandler(form: NgForm): void {
    
    if (form.invalid) { return; }
    
    const { name, email, password, phoneNumber } = form.value
    
    this.userService.register(name, email, password, phoneNumber)
    .pipe(
      tap(x => localStorage.setItem('auth', JSON.stringify(x)))
      )
      .subscribe({
        next: () => {
        this.userService.addUserInDb(name, email, phoneNumber)
        this.router.navigate(['/dashboard/create']);
      },
      error: (err) => {
        let currentError: string;
        
        if (err.error.error.message == 'EMAIL_EXISTS') {
          currentError = 'Email alredy exists!!!'
        }
        this.error! = currentError! 
      }

    });
  }



}
