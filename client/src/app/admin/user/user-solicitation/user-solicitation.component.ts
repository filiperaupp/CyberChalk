import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UserSolicitation } from '../../../models/userSolicitation';
import { UserSolicitationService } from './user-solicitation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-solicitation',
  templateUrl: './user-solicitation.component.html',
  styleUrls: ['./user-solicitation.component.css']
})
export class UserSolicitationComponent implements OnInit {
  @ViewChild('inputSelect') inputSelect: ElementRef
  @ViewChild('closeButtonAcc') closeButtonAcc: ElementRef;
  @ViewChild('closeButtonRej') closeButtonRej: ElementRef;

  private loading: boolean = true;
  private loadingAction = false;
  private isNull: boolean = false;
  private solicitations: UserSolicitation[]
  private selectedSolicitation: UserSolicitation = null
  private selectedOption: string
  private selectedOptionValue: string

  constructor(private _userSolicitationService: UserSolicitationService,
              private route: Router) { }



  ngOnInit() {
    this.getPending()
  }

  getPending() {
    this._userSolicitationService.getPending()
      .subscribe(
        (res: UserSolicitation[]) => {
          this.loading = false
          if (res.length == 0)
            this.isNull = true
          this.solicitations = res;
        },
        error => {
          console.log(error)
        }
      )
  }

  getSolicitation(index) {
    this.selectedSolicitation = this.solicitations[index]
    this.selectedOption = this.inputSelect.nativeElement.selectedOptions[0].text
    this.selectedOptionValue = this.inputSelect.nativeElement.selectedOptions[0].value
  }

  rejected() {
    this.loadingAction = true
    let rejectedUser = new FormData()
    let idSolicitation = this.selectedSolicitation.id
    rejectedUser.append('idSolicitation', idSolicitation)
    rejectedUser.append('status', 'rejected')
    this._userSolicitationService.updateStatus(rejectedUser, idSolicitation)
      .subscribe(
        arg => {
          this.loadingAction = false
          this.triggerFalseClick('rej')
          this.getPending()
        },
        error => this.loadingAction = false
      )
  }

  confirmed() {
    this.loadingAction = true
    let acceptedUser = new FormData()
    let idSolicitation = this.selectedSolicitation.id
    acceptedUser.append('idSolicitation', idSolicitation)
    acceptedUser.append('name', this.selectedSolicitation.name)
    acceptedUser.append('cgu', this.selectedSolicitation.cgu)
    acceptedUser.append('email', this.selectedSolicitation.email)
    acceptedUser.append('type', this.selectedOptionValue)
    acceptedUser.append('status', 'accepted')
    this._userSolicitationService.postNewUser(acceptedUser)
      .subscribe(
        arg => {
          this._userSolicitationService.updateStatus(acceptedUser, idSolicitation)
            .subscribe(
              arg => {
                this.loadingAction = false
                this.triggerFalseClick('acc')
                this.getPending()
              },
              error => this.loadingAction = false
              );
            },
        error =>
        this.loadingAction = false
      );

  }

  triggerFalseClick(status) {
    let el: HTMLElement
    if (status == 'acc')
      el = this.closeButtonAcc.nativeElement as HTMLElement;
    if (status == 'rej')
      el = this.closeButtonRej.nativeElement as HTMLElement;

    el.click();
  }

}
