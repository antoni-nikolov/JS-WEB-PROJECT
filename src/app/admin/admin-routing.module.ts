
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activate';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { FavoritesComponent } from './favorites/favorites.component';
import { MainComponent } from './main/main.component';
import { MessagesComponent } from './messages/messages.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create'
      },
      {
        path: 'my-properties',
        component: MyPropertiesComponent,
        canActivate: [AuthActivate],
        data: {
          authenticationRequired: true,
          authenticationFailureRedirectUrl: '/login'
        }
      },
      {
        path: 'create',
        component: CreateComponent,
        canActivate: [AuthActivate],
        data: {
          authenticationRequired: true,
          authenticationFailureRedirectUrl: '/login'
        }
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        canActivate: [AuthActivate],
        data: {
          authenticationRequired: true,
          authenticationFailureRedirectUrl: '/login'
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthActivate],
        data: {
          authenticationRequired: true,
          authenticationFailureRedirectUrl: '/login'
        }
      },
      {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [AuthActivate],
        data: {
          authenticationRequired: true,
          authenticationFailureRedirectUrl: '/login'
        }
      },
      {
        path: 'my-properties/edit/:_ownerid/:_id',
        component: EditComponent,
        canActivate: [AuthActivate],
        data: {
          authenticationRequired: true,
          authenticationFailureRedirectUrl: '/login'
        }
      },
    ]
  },

];

export const AdminRoutingModule = RouterModule.forChild(routes)
