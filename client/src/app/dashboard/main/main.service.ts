import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getData(){
    let topUsers = this.http.get('http://localhost:8000/api/top-users')
    let lastestContents = this.http.get('http://localhost:8000/api/lastest-contents')
    let lastestCourses = this.http.get('http://localhost:8000/api/lastest-courses')

    return forkJoin([topUsers, lastestContents, lastestCourses])
  }

}
