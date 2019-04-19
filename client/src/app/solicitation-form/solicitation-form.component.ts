import { Component, OnInit } from '@angular/core';

import { UserSolicitationService } from '../user-solicitation/user-solicitation.service';

@Component({
  selector: 'solicitation-form',
  templateUrl: './solicitation-form.component.html',
  styleUrls: ['./solicitation-form.component.css']
})
export class SolicitationFormComponent implements OnInit {

  private success = false;
  private fail = false;

  constructor(private _userSolicitationService: UserSolicitationService) { }

  ngOnInit() {
  }

  onSubmit(form){
    let newSolicitation = new FormData()
    newSolicitation.append('name',form.value.name)
    newSolicitation.append('cgu',form.value.cgu)
    newSolicitation.append('email',form.value.email)
    newSolicitation.append('password',form.value.password)
    newSolicitation.append('status',"pending")
    this._userSolicitationService.post(newSolicitation)
      .subscribe(
        res => 
          console.log(res),
        error => 
          console.log(error)
      )
  }

}
