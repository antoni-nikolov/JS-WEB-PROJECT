
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { FavoritesComponent } from './favorites/favorites.component';
import { MainComponent } from './main/main.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
    
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create'
      },
        {
          path: 'my-properties',
          component: MyPropertiesComponent
        },
        {
            path: 'create',
            component: CreateComponent
        },
        {
            path: 'favorites',
            component: FavoritesComponent
        },
        {
          path: 'profile',
          component: ProfileComponent
        },
        {
          path: 'my-properties/edit/:_ownerid/:_id',
          component: EditComponent
        },
    ]
  },

];

export const AdminRoutingModule = RouterModule.forChild(routes)
