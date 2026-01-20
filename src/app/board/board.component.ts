import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';
import { TaskService } from '../services/taskservice';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Authservice } from '../services/authservice';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, RouterModule, DragDropModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  toDoList: Task[] = [];
  inProgressList: Task[] = [];
  doneList: Task[] = [];

  constructor(
    private readonly taskService: TaskService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private authService: Authservice
  ) {}

  ngOnInit() {
    this.taskService.getTaskByStatus('to-do').subscribe(tasks => {
      this.toDoList = tasks;
      this.cd.detectChanges();
    });
    this.taskService.getTaskByStatus('in-progress').subscribe(tasks => {
      this.inProgressList = tasks;
      this.cd.detectChanges();
    });
    this.taskService.getTaskByStatus('done').subscribe(tasks => {
      this.doneList = tasks;
      this.cd.detectChanges();
    });
  }

  openTask(taskId: string) {
    this.router.navigate(['/task', taskId]);
  }

  trackById(index: number, task: Task) {
    return task.id;
  }

  createTask() {
    this.router.navigate(['/task', 'new']);
  }

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

  drop(event: CdkDragDrop<Task[]>, status: 'to-do' | 'in-progress' | 'done') {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = status;
      this.taskService.editTask(task);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.cd.detectChanges();
  }
}
