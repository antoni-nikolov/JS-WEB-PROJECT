
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertiesComponent } from './properties/properties.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { MainComponent } from './admin/main/main.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'properties',
    component: PropertiesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: MainComponent
  },
  {
    path: 'properties/details/:_ownerid/:_id',
    component: DetailsComponent
  },

];

export const AppRoutingModule = RouterModule.forRoot(routes)
