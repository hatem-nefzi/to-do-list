// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { TaskList } from './components/task-list/task-list';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'tasks', component: TaskList },
  { path: '**', redirectTo: '/login' }
];