import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';
import { TaskService } from '../services/taskservice';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Authservice } from '../services/authservice';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  toDo!: Observable<Task[]>;
  inProgress!: Observable<Task[]>;
  done!: Observable<Task[]>;

  constructor(
    private readonly taskService: TaskService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private authService: Authservice
  ) {}

  ngOnInit() {
    this.toDo = this.taskService.getTaskByStatus('to-do');
    this.inProgress = this.taskService.getTaskByStatus('in-progress');
    this.done = this.taskService.getTaskByStatus('done');
    this.cd.detectChanges();
  }

  openTask(taskId: string) {
    this.router.navigate(['/task', taskId]);
  }

  trackById(index: number, task: Task) {
    return task.id;
  }

  createTask() {
    // Navigate to a task creation page or open a modal (adjust as needed)
    this.router.navigate(['/task', 'new']);
  }

  // Public method for template navigation to new-task
  navigateToNewTask() {
    this.router.navigate(['/new-task']);
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
