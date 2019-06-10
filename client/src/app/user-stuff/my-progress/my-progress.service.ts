import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyProgressService {

  constructor(private http: HttpClient) { }

  getProgress(){
    return this.http.get('http://localhost:8000/api/courses-in-progress')
  }
}
