import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get('http://localhost:8000/api/user-logged')
  }

  changeProfilePhoto(photo){
    return this.http.post('http://localhost:8000/api/profile-photo', photo)
  }

  updateUser(updatedData){
    return this.http.put('http://localhost:8000/api/user-update', updatedData)
  }
}
