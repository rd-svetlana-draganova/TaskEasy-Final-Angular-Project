import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CommonModule} from '@angular/common';
import {Task} from '../models/task.model';
import { TaskService } from '../services/taskservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  toDo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(
    private readonly taskService: TaskService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.taskService.loadTasks().subscribe((tasks: Task[]) => {
      this.toDo = tasks.filter((task: Task) => task.status === 'to-do');
      this.inProgress = tasks.filter((task: Task) => task.status === 'in-progress');
      this.done = tasks.filter((task: Task) => task.status === 'done');
      this.cd.detectChanges();
    });
  }

  openTask(taskId: string) {
    this.router.navigate(['/task', taskId]);
  }

  trackById(index: number, task: Task) {
    return task.id;
  }
}
