import { Component,  OnDestroy } from '@angular/core';
import { NgForm, } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user-service.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  subscription = new Subscription();

  error!: string | null

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }


  loginHandler(form: NgForm): void{

    if (form.invalid) { return; }
    const { email, password } = form.value;

    this.subscription.add(
    this.userService.login(email, password)
    .pipe(
      tap(x => localStorage.setItem('auth', JSON.stringify(x)))
    ).subscribe({
     next: () => {
       this.router.navigate(['/dashboard/my-properties']);
     },
     error: (err) => {
       let currentError: string;
       if (err.error.error.message == 'EMAIL_NOT_FOUND' ||err.error.error.message == 'INVALID_PASSWORD') {
         currentError = 'Incorect password or email!!!'
       }
       this.error! = currentError! 
       form.reset()
     }
   }));
 }

 ngOnDestroy(): void{
   this.subscription.unsubscribe();
 }

   
}

