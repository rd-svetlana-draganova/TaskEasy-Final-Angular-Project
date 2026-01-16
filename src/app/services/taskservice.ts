import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly storageKey = 'tasks';

  constructor(private readonly http: HttpClient) {}

  // Load tasks: from localStorage if present, else from JSON and save to localStorage
  loadTasks(): Observable<Task[]> {
    const tasksJson = localStorage.getItem(this.storageKey);
    if (tasksJson) {
      const tasks = JSON.parse(tasksJson);
      if (Array.isArray(tasks) && tasks.length > 0) {
        return of(tasks);
      }
    }
    return this.http.get<Task[]>('assets/tasks.json').pipe(
      tap(tasks => localStorage.setItem(this.storageKey, JSON.stringify(tasks)))
    );
  }

  // Save all tasks to local storage
  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  // Add a new task
  addTask(task: Task): void {
    const tasks = this.getTasksFromStorage();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  // Edit an existing task
  editTask(updatedTask: Task): void {
    const tasks = this.getTasksFromStorage().map((task: Task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.saveTasks(tasks);
  }

  // Delete a task by ID
  deleteTask(id: string): void {
    const tasks = this.getTasksFromStorage().filter((task: Task) => task.id !== id);
    this.saveTasks(tasks);
  }

  // Get a task by ID (as Observable)
  getTaskById(id: string): Observable<Task | undefined> {
    return this.loadTasks().pipe(
      map((tasks: Task[]) => tasks.find((task: Task) => task.id === id))
    );
  }

  // Get tasks by status (as Observable)
  getTaskByStatus(status: string): Observable<Task[]> {
    return this.loadTasks().pipe(
      map((tasks: Task[]) => tasks.filter((task: Task) => task.status === status))
    );
  }

  //Getting max ID
  getNextAvailableId(): number {
    const tasks = this.getTasksFromStorage();
    // Find max id (as number)
    const maxId = tasks.length > 0 ? Math.max(...tasks.map((task: Task) => Number(task.id))) : 0;

    return maxId + 1;
  }

  // Helper: get tasks from local storage (sync)
  private getTasksFromStorage(): Task[] {
    const tasksJson = localStorage.getItem(this.storageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }
}
