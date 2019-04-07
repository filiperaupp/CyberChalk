import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private token = ''
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer' + this.token
    })
  }

  constructor(private http: HttpClient) {
    
  }


  public login(user):boolean{
    this.http.post("http://localhost:8000/api/auth/login",user).subscribe(
      (val:any) => {
        this.token = val.token
        console.log(this.httpOptions)
        return true;
      },
      response => {
        console.log(response)
        return false;
      }
    )
    return false;
  }

  public getProdutos(){
    return this.http.get("http://localhost:8000/api/produtos",this.httpOptions)
  }

}
