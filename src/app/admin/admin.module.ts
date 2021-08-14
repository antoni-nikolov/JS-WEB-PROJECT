import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './edit/edit.component'; 

import { MatListModule } from '@angular/material/list'; 
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AdminRoutingModule } from './admin-routing.module';
import { PropertyItemComponent } from '../property-item/property-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './message-item/message-item.component';




@NgModule({
  declarations: [
      CreateComponent,
      FavoritesComponent,
      MyPropertiesComponent,
      ProfileComponent,
      MainComponent,
      PropertyItemComponent,
      EditComponent,
      MessagesComponent,
      MessageItemComponent
      
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    AdminRoutingModule,
  ],
  exports: [
    PropertyItemComponent,
    MatProgressSpinnerModule

  ]
})
export class AdminModule { }
