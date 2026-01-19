import { Authservice } from './authservice';

describe('Authservice', () => {
  let service: Authservice;

  beforeEach(() => {
    service = new Authservice();
    service.logout(); // Ensure clean state
  });

  it('should not authenticate with wrong credentials', () => {
    expect(service.login('wrong', 'wrong')).toBe(false);
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should authenticate valid user1', () => {
    expect(service.login('user1', '123')).toBe(true);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should authenticate valid user2', () => {
    expect(service.login('user2', '456')).toBe(true);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should logout and clear authentication', () => {
    service.login('user1', '123');
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
  });
});
