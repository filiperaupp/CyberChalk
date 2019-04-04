import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _loginService: LoginService) { }


  ngOnInit() {
  }

  send(form) {
    let user = new FormData;
    user.append('email', form.value.email);
    user.append('password', form.value.password);
    this.login(user);
  }

  login(user){
    this._loginService.login(user)
      .subscribe(
        (val:any) => {
          let token = val.token;
          console.log(token);
        },
        response => {
          console.log(response)
        }
      )
  }

}
