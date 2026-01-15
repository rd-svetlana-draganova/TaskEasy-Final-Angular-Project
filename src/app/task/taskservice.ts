import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {Task} from '../models/task.model';

export class TaskService {

  private tasks: Task[] = [];

  constructor(private readonly http: HttpClient) {}

  loadTasks() {
    return this.http.get<Task[]>('/public/task.json')
      .pipe(tap(data => this.tasks = data));
  }

  getTasksByStatus(status: Task['status']) {
    return this.tasks.filter(task => task.status === status)
  }

  getTaskById(id: number) {
    return this.tasks.find(task => task.id === id);
  }
}
