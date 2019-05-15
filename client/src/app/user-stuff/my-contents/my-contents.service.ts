import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyContentsService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get('http://localhost:8000/api/content-solicitations')
  }

  post(newContent){
    return this.http.post('http://localhost:8000/api/content-solicitations',newContent)
  }

  getById(id){
    return this.http.get('http://localhost:8000/api/content-solicitations/'+id)
  }
  
}
