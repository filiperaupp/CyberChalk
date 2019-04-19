import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSolicitationService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get('http://localhost:8000/api/user-solicitations')
  }

  post(userSolicitation){
    return this.http.post('http://localhost:8000/api/user-solicitation',userSolicitation)
  }

  updateStatus(userSolicitation,id){
    return this.http.post('http://localhost:8000/api/user-solicitation/'+id, userSolicitation)
  }

  postNewUser(newUser){
    return this.http.post('http://localhost:8000/api/auth/registro',newUser)
  }
}
