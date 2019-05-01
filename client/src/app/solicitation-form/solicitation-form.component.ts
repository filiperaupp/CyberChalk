import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { UserSolicitationService } from '../admin/user/user-solicitation/user-solicitation.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'solicitation-form',
  templateUrl: './solicitation-form.component.html',
  styleUrls: ['./solicitation-form.component.css']
})
export class SolicitationFormComponent implements OnInit {
  @ViewChild('closeButton') myDiv: ElementRef;

  solicitationForm = this.fb.group({
    name: ['', Validators.required],
    cgu: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  loading:boolean = false;
  success:boolean = false;

  constructor(private _userSolicitationService: UserSolicitationService,
              private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true
    let newSolicitation = this.solicitationForm.value
    this._userSolicitationService.post(newSolicitation)
      .subscribe(
        res => {
          console.log(res)
          this.loading = false
          this.success = true
        },
        error => {
          console.log(error)
          this.loading = false
        }
      )
  }


  ngOnDestroy(){
    this.triggerFalseClick()
  }

  eventClose(){
    this.solicitationForm.reset()
    this.success = false
  }

  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement as HTMLElement;
    el.click();
  }

}
