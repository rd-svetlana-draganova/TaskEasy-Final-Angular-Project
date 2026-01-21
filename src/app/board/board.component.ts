import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';
import { TaskService } from '../services/taskservice';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Authservice } from '../services/authservice';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  toDoList: Task[] = [];
  inProgressList: Task[] = [];
  doneList: Task[] = [];
  assignedToFilter: string = '';
  estimationFilter: string = '';
  filteredToDoList: Task[] = [];
  filteredInProgressList: Task[] = [];
  filteredDoneList: Task[] = [];

  constructor(
    private readonly taskService: TaskService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private authService: Authservice
  ) {}

  ngOnInit() {
    this.taskService.getTaskByStatus('to-do').subscribe(tasks => {
      this.toDoList = tasks;
      this.applyFilters();
      this.cd.detectChanges();
    });
    this.taskService.getTaskByStatus('in-progress').subscribe(tasks => {
      this.inProgressList = tasks;
      this.applyFilters();
      this.cd.detectChanges();
    });
    this.taskService.getTaskByStatus('done').subscribe(tasks => {
      this.doneList = tasks;
      this.applyFilters();
      this.cd.detectChanges();
    });
  }

  applyFilters() {
    let estimationValue = this.determineEstimationFilterValue(this.estimationFilter);

    this.filteredToDoList = this.toDoList.filter(task =>
      (this.assignedToFilter === '' || task.assignedTo === this.assignedToFilter) &&
      (estimationValue === '' || task.estimation === estimationValue)
    );
    this.filteredInProgressList = this.inProgressList.filter(task =>
      (this.assignedToFilter === '' || task.assignedTo === this.assignedToFilter) &&
      (estimationValue === '' || task.estimation === estimationValue)
    );
    this.filteredDoneList = this.doneList.filter(task =>
      (this.assignedToFilter === '' || task.assignedTo === this.assignedToFilter) &&
      (estimationValue === '' || task.estimation === estimationValue)
    );
  }

  private determineEstimationFilterValue(value: string): string {
    const validValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
    if (validValues.includes(value)) return value;
    return '';
  }

  applyAssignedToFilter() {
    this.applyFilters();
  }

  applyEstimationFilter() {
    this.applyFilters();
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
