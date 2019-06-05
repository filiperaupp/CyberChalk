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

  getContentsByUser(){
    return this.http.get('http://localhost:8000/api/content-by-user')
  }

  post(newContent){
    return this.http.post('http://localhost:8000/api/content-solicitations',newContent)
  }

  getById(id){
    return this.http.get('http://localhost:8000/api/content-solicitations/'+id)
  }
  
  delete(id){
    return this.http.delete('http://localhost:8000/api/content-solicitations/'+id)
  }

  postTeste(updatedContent){
    return this.http.post('http://localhost:8000/api/content-solicitations/teste', updatedContent)
  }

  sendToApprove(idContent, content) {
    return this.http.post('http://localhost:8000/api/content-to-approve/'+idContent, content)
  }

  // CONTENT STATUS CONTROL
  changeStatus(idContent, status) {
    return this.http.post('http://localhost:8000/api/content-change-status/'+idContent, status)
  }
}
