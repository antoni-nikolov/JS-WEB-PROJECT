import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { PasswordsMatchDirective } from './passwords-match.directive'; 



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    PasswordsMatchDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
    
  ],

  providers: [
    
  ]

})
export class UserModule { }
