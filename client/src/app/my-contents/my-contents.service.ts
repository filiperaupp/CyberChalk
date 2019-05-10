import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyContentsService {

  constructor(private http: HttpClient) { }

  teste(photo){
    return this.http.post('http://localhost:8000/api/teste',photo)
  }

  testeDelete(id){
    return this.http.delete('http://localhost:8000/api/teste')
  }
}
