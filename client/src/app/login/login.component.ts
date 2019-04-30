import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('closeButton') closeButton: ElementRef;
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  loading:boolean = false;
  unauthorized:boolean = false;

  constructor(private _authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.loading = true;
    this.unauthorized = false;
    let login = this.loginForm.value
    this._authService.login(login)
      .subscribe(
        res => {
          this.loading = false;
          this.triggerFalseClick()
          this.router.navigate(['/dashboard']);
        },
        error => {
          if (error === "Unauthorized")
            this.unauthorized = true;
          this.loading = false;
        }
      )
  }

  logout(){
    this._authService.logout();
  }

  triggerFalseClick() {
    let el: HTMLElement = this.closeButton.nativeElement as HTMLElement;
    el.click();
  }
  
  ngOnDestroy(){
    this.triggerFalseClick()
  }
  

}
