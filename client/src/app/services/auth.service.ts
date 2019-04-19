import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

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

  public login(login) {
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
    this.currentUserSubject.next(null)
  }
}
