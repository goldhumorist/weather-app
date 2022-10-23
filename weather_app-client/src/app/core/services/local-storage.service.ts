import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getAuthTokenFromLocalStorage(): string | null {
    return localStorage.getItem('auth_token');
  }
  setAuthTokenToLocalStorage(authToken: string) {
    localStorage.setItem('auth_token', authToken);
  }
  removeAuthTokenFromLocalStorage(): void {
    localStorage.removeItem('auth_token');
  }
}
