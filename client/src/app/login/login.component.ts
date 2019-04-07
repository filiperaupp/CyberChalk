import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService) { }


  ngOnInit() {
  }

  send(form) {
    let email = form.value.email;
    let password = form.value.password;
    this._authService.login(email, password).subscribe(
      res => {
        console.log('Sucesso: ', res)
      },
      error => {
        console.log('falhou: ', error)
      }
    )
  }

  pegaProdutos(){
    this._authService.getProdutos().subscribe(
      res => console.log(res),
      error => console.log(error)
    )
  }

  logout(){
    this._authService.logout().subscribe(
      res => {
        console.log('Sucesso: ', res)
      },
      error => {
        console.log('falhou: ', error)
      }
    )
  }



}
