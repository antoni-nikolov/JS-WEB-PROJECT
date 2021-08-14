import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PropertiesComponent } from './properties/properties.component';
import { DetailsComponent } from './details/details.component';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { CatalogService } from './catalog-service';
import { UserService } from './user-service.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from './message.service';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatExpansionModule} from '@angular/material/expansion'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PropertiesComponent,
    DetailsComponent,
    NotFoundComponent,
    
  ],
  imports: [
    AdminModule,
    UserModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatExpansionModule,
    AppRoutingModule,
     
  ],
  providers: [
    CatalogService,
    UserService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
