import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Task} from '../models/task.model';
import {TaskService} from '../task/taskservice';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit{

  toDo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(private readonly taskService: TaskService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.taskService.loadTasks().subscribe(tasks => {
      console.log('Loaded tasks:', tasks);
      this.toDo = tasks.filter(task => task.status === 'to-do');
      this.inProgress = tasks.filter(task => task.status === 'in-progress');
      this.done = tasks.filter(task => task.status === 'done');
      console.log('To Do:', this.toDo);
      console.log('In Progress:', this.inProgress);
      console.log('Done:', this.done);
      this.cd.markForCheck();
    });
  }
}
