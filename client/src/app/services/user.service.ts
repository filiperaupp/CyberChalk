import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getAll(){
    return this.http.get<User[]>('http://localhost:8000/api/users')
  }

  getBydId(id:number){
    return this.http.get<User>('http://localhost:8000/api/users/' + id)
  }

  delete(id){
    return this.http.delete('http://localhost:8000/api/users/' + id)
  }

  updateType(form, id){
    return this.http.post('http://localhost:8000/api/users/' + id, form)
  }
}
