import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getUserLogged(){
    return this.http.get('http://localhost:8000/api/user-logged')
  }

  deleteComment(idComment){
    return this.http.delete('http://localhost:8000/api/comments/'+idComment)
  }
}
