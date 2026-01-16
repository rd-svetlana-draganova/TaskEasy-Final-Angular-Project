import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskService {

  constructor(private readonly http: HttpClient) {}

  loadTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('assets/tasks.json');
  }

  getTaskById(id: string): Observable<Task | undefined> {
    return this.loadTasks().pipe(
      map(tasks => {
        const filteredTask = tasks.find(task => task.id === id);
        console.log("Task: " + tasks);
        console.log("FilteredTask: " + filteredTask);
        return filteredTask;
      })
    );
  }

  getTaskByStatus(status: string): Observable<Task[]> {
    return this.loadTasks().pipe(
      map(tasks => tasks.filter(task => task.status === status))
    );
  }
}
