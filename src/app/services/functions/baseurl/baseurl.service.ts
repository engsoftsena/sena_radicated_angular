import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseurlService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = this.extractBaseUrl();
  }

  private extractBaseUrl(): string {
    const baseTag = document.querySelector('base');
    return baseTag ? baseTag.getAttribute('href') || '/' : '/';
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
