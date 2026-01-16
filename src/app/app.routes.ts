import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { BoardComponent } from './board/board.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewTaskComponent } from './new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: BoardComponent
  },
  {
    path: 'task/:id',
    component: TaskComponent
  },
  {
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'new-task',
    component: NewTaskComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
