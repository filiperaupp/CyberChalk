import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  //Get categories and User data
  getData(){
    let categories = this.http.get('http://localhost:8000/api/categories')
    let user = this.http.get('http://localhost:8000/api/user-logged')
    
    return forkJoin([categories, user])
  }
}
