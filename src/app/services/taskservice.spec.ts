import { TaskService } from './taskservice';
import { Task } from '../models/task.model';
import { of } from 'rxjs';

class MockHttpClient {
  get() { return of([]); }
}

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService(new MockHttpClient() as any);
    localStorage.clear();
  });

  it('should add and retrieve a task', async () => {
    const task: Task = { id: '1', title: 'Test', description: 'Desc', status: 'to-do', estimation: '', assignedTo: 'user1' };
    service.addTask(task);
    const tasks = await service.loadTasks().toPromise();
    expect(tasks && tasks.length).toBe(1);
    expect(tasks && tasks[0]).toEqual(task);
  });

  it('should edit a task', async () => {
    const task: Task = { id: '1', title: 'Test', description: 'Desc', status: 'to-do', estimation: '', assignedTo: 'user1' };
    service.addTask(task);
    const updated = { ...task, title: 'Updated' };
    service.editTask(updated);
    const tasks = await service.loadTasks().toPromise();
    expect(tasks && tasks[0].title).toBe('Updated');
  });

  it('should delete a task', async () => {
    const task: Task = { id: '1', title: 'Test', description: 'Desc', status: 'to-do', estimation: '', assignedTo: 'user1' };
    service.addTask(task);
    service.deleteTask('1');
    const tasks = await service.loadTasks().toPromise();
    expect(tasks && tasks.length).toBe(0);
  });

  it('should get next available id', () => {
    expect(service.getNextAvailableId()).toBe(1);
    service.addTask({ id: '1', title: '', description: '', status: 'to-do', estimation: '', assignedTo: 'user1' });
    expect(service.getNextAvailableId()).toBe(2);
  });
});
