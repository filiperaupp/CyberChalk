import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { fillProperties } from '@angular/core/src/util/property';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currenUserValue(): User {
    return this.currentUserSubject.value
  }

  login(cgu:string, password:string) {
    let login = new FormData()
    login.append('email',cgu)
    login.append('password',password)
    return this.http.post('http://localhost:8000/api/auth/login', login)
      .pipe(map((user:User)=> {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user))
          this.currentUserSubject.next(user)
        }
        return user
      }))
  }

  public getProdutos(){
    return this.http.get("http://localhost:8000/api/produtos")
  }

  public logout() {
    localStorage.removeItem('currentUser')
    return this.http.post("http://localhost:8000/api/auth/logout",'')
  }
}
