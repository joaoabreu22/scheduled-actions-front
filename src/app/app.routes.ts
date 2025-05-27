import { Routes } from '@angular/router';
import { ActionListComponent } from './features/actions/pages/action-list/action-list.component';
import { ActionFormComponent } from './features/actions/pages/action-form/action-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'acoes', pathMatch: 'full' },
  { path: 'acoes', component: ActionListComponent },
  { path: 'nova', component: ActionFormComponent },
  { path: 'editar/:id', component: ActionFormComponent }
];
