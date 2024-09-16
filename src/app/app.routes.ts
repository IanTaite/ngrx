import { Routes } from '@angular/router';
import { ListComponent } from './movies/components/list/list.component';
import { SaveComponent } from './movies/components/save/save.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path:'create',
    component: SaveComponent,
  },
  {
    path: 'update/:id',
    component: SaveComponent
  }
];
