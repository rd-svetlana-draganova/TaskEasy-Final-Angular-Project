import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/taskservice';
import { Authservice } from '../services/authservice';
import { of } from 'rxjs';

// Provide mocks for all dependencies
class MockTaskService {
  getTaskByStatus() { return of([]); }
}
class MockAuthservice {
  isAuthenticated() { return true; }
  logout() {}
}
class MockRouter {
  navigate() {}
}

class MockActivatedRoute {}

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers: [
        { provide: TaskService, useClass: MockTaskService },
        { provide: Authservice, useClass: MockAuthservice },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
