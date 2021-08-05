import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PropertiesComponent } from './properties/properties.component';

import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { CatalogService } from './catalog-service';
import { UserService } from './user-service.service';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PropertiesComponent,
    DetailsComponent,
    
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
    AppRoutingModule,
     
  ],
  providers: [
    CatalogService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
