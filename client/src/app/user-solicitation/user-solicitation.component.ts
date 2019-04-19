import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UserSolicitation } from './../models/userSolicitation';
import { UserSolicitationService } from './user-solicitation.service';

@Component({
  selector: 'app-user-solicitation',
  templateUrl: './user-solicitation.component.html',
  styleUrls: ['./user-solicitation.component.css']
})
export class UserSolicitationComponent implements OnInit {
  @ViewChild('inputSelect') inputSelect: ElementRef

  private loading: boolean = true;
  private isNull: boolean = false;
  private solicitations: UserSolicitation[]
  private selectedSolicitation: UserSolicitation = null
  private selectedOption: string
  private selectedOptionValue: string

  constructor(private _userSolicitationService: UserSolicitationService) { }

  

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this._userSolicitationService.getAll()
      .subscribe(
        (res:UserSolicitation[]) => {
          this.loading = false
          if (res.length==0)
            this.isNull = true
          else
          console.table(res)
          this.solicitations = res;
        },
        error => {
          console.log(error)
        }
      )
  }

  getSolicitation(index){
    this.selectedSolicitation = this.solicitations[index]
    this.selectedOption = this.inputSelect.nativeElement.selectedOptions[0].text
    this.selectedOptionValue = this.inputSelect.nativeElement.selectedOptions[0].value
  }

  confirmed(){
    let newUser = new FormData()
    let idSolicitation = this.selectedSolicitation.id  
    newUser.append('id',this.selectedSolicitation.id)
    newUser.append('name',this.selectedSolicitation.name)
    newUser.append('cgu',this.selectedSolicitation.cgu)
    newUser.append('email',this.selectedSolicitation.email)
    newUser.append('type',this.selectedOptionValue)
    this._userSolicitationService.updateStatus(newUser,idSolicitation)
    .subscribe(
      arg => console.log(arg),
      error => console.log(error)
      );
    // this._userSolicitationService.postNewUser(newUser)
    //    .subscribe(
    //      arg => 
    //        console.log(arg),
    //      error =>
    //        console.log(error)
    //      );
      
  }

}
