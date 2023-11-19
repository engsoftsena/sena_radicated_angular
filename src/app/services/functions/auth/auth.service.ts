import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private authToken = 'authToken';

  setAuthToken(token: string): void {
    sessionStorage.setItem(this.authToken, token);
  }

  getAuthToken(): string | null {
    const sessionToken = sessionStorage.getItem(this.authToken);
    if (sessionToken) { return sessionToken; }
    return null;
  }
}
