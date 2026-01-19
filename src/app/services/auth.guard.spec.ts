import { AuthGuard } from './auth.guard';
import { Authservice } from './authservice';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let auth: Authservice;
  let router: Router;
  let navigated: boolean;

  beforeEach(() => {
    auth = new Authservice();
    navigated = false;
    router = { navigate: () => { navigated = true; } } as any;
    guard = new AuthGuard(auth, router);
    auth.logout();
  });

  it('should allow activation if authenticated', () => {
    auth.login('user1', '123');
    expect(guard.canActivate()).toBe(true);
  });

  it('should deny activation and redirect if not authenticated', () => {
    expect(guard.canActivate()).toBe(false);
    expect(navigated).toBe(true);
  });
})
