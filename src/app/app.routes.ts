import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { BoardComponent } from './board/board.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: BoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'task/:id',
    component: TaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'task',
    component: TaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-task',
    component: NewTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
