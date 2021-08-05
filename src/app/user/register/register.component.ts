import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../../user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  registerHandler(form: NgForm): void {

    if (form.invalid) { return; }

    const { name, email, password } = form.value

     this.userService.register(name, email, password).pipe(
       map(x => localStorage.setItem('auth', JSON.stringify(x)))
     ).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/create']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }



}
