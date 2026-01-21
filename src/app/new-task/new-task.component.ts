import { Component } from '@angular/core';
import { TaskService } from '../services/taskservice';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task.component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  task: Task | undefined;
  taskId: string | null = null;
  editTitle = '';
  editDescription = '';
  editAssignedTo: 'user1' | 'user2' | 'user3' = 'user1';
  editEstimation = '';
  editStatus: 'to-do' | 'in-progress' | 'done' = 'to-do';

  constructor(private taskService: TaskService) {}

  // Save the new task using TaskService and reset form fields
  saveTask() {
    if (!this.editTitle.trim()) {
      alert('Title is required');
      return;
    }
    const newTask: Task = {
      id: String(this.taskService.getNextAvailableId()),
      title: this.editTitle,
      description: this.editDescription,
      assignedTo: this.editAssignedTo,
      estimation: this.editEstimation,
      status: this.editStatus
    };
    this.taskService.addTask(newTask);
    // Reset form fields or navigate away
    this.editTitle = '';
    this.editDescription = '';
    this.editAssignedTo = 'user1';
    this.editEstimation = '';
    this.editStatus = 'to-do';
    alert('Task created successfully!');
  }

  // Cancel editing/creation and reset fields
  cancelEdit() {
    this.editTitle = '';
    this.editDescription = '';
    this.editAssignedTo = 'user1';
    this.editEstimation = '';
    this.editStatus = 'to-do';
  }
}
