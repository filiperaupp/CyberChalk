import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowContentService {

  constructor(private http: HttpClient) {}

  getContent(idContent){
    return this.http.get('http://localhost:8000/api/content-solicitations/'+idContent)
  }
}
