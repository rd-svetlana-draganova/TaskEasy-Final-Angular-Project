import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/taskservice';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';

class MockTaskService {
  getTaskById() { return of({ id: '1', title: 'Test', description: 'Desc', status: 'to-do' }); }
  getTaskByStatus() { return of([]); }
}
class MockRouter { navigate() {} }
class MockActivatedRoute { params = of({ id: '1' }); }
class MockChangeDetectorRef { detectChanges() {} }

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
      providers: [
        { provide: TaskService, useClass: MockTaskService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
