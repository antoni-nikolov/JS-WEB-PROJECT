import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'; 
import { RouterModule } from '@angular/router';
import { AuthActivate } from './guards/auth.activate';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
  ],
  exports: [
   HeaderComponent,
   FooterComponent
  ],
  providers: [
    AuthActivate
  ]
})
export class CoreModule { }
