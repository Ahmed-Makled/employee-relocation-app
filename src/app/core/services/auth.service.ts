import { Injectable } from '@angular/core';
import { AuthModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated: boolean = false;
  private tokenStorageName = 'TIE_TOKEN'
  // Simulating a login process
  login(data: AuthModel): boolean {
    if (data.Username === 'tie' && data.Password === 'tie') {
      this.authenticated = true;
      localStorage.setItem(this.tokenStorageName, 'sdasdas-saddas-dwew-e-wqe==1'); // Store authentication token
      return true;
    } else {
      this.authenticated = false;
      return false;
    }
  }

  // Simulating a logout process
  logout(): void {
    this.authenticated = false;
    localStorage.removeItem(this.tokenStorageName); // Remove stored token
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const TOKEN = localStorage.getItem(this.tokenStorageName);
    if (TOKEN) {
      this.authenticated = true
    } else {
      this.authenticated = false
    }

    return this.authenticated;
  }
}
