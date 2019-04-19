import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  display = 'block';

  constructor(private _authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  send(form) {
    let login = new FormData()
    login.append('email',form.value.email)
    login.append('password',form.value.password)
    this._authService.login(login)
      .subscribe(
        res => {
          console.log('Sucesso: ', res)
          this.router.navigate(['/dashboard']);
          document.getElementById('loginModal').style.display = "none";
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
    this._authService.logout();
  }

  fecha(){
    
  }



}
