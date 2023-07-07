import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://127.0.0.1/api/';
  extPHP = '.php';
  constructor(
    private http: HttpClient
  ) { }

  get_test() {
    this.http.get(this.baseUrl + 'tg_user_data/read' + this.extPHP);
  }
}
