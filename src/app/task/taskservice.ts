import {HttpClient} from '@angular/common/http';
import {Task} from '../models/task.model';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {

  constructor(private readonly http: HttpClient) {}

  loadTasks() {
    return this.http.get<Task[]>('assets/tasks.json');
  }
}
