import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/taskservice';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../not-found/not-found.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, NotFoundComponent, MatIconModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: Task | undefined;
  taskId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.taskId = params['id'];
      if (this.taskId) {
          this.taskService.getTaskById(String(this.taskId)).subscribe(task => {
          this.task = task;
          this.cd.detectChanges();
        });
      }
    });
  }
}

