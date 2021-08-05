import { Component,  OnInit } from '@angular/core';
import { NgForm, } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user-service.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  loginHandler(form: NgForm): void{
    if (form.invalid) { return; }
    const { email, password } = form.value;

    this.userService.login(email, password).pipe(
      map(x => localStorage.setItem('auth', JSON.stringify(x)))
    ).subscribe({
     next: () => {
       this.router.navigate(['/dashboard/my-properties']);
     },
     error: (err) => {
       console.error(err);
     }
   })
 }

   
}

