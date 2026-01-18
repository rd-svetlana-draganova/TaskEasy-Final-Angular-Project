import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Authservice {
  private readonly storageKey = 'isAuthenticated';
  private readonly validAccounts: { [username: string]: string } = {
    'user1': '123',
    'user2': '456',
    'user3': '789'
  };

  login(username: string, password: string): boolean {
    if (this.validAccounts[username] && this.validAccounts[username] === password) {
      localStorage.setItem(this.storageKey, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }
}
