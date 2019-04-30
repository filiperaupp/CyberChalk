import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { FilterNamePipe } from 'src/app/pipes/filter-name.pipe';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  @ViewChild('closeButton') closeButton: ElementRef;
  @ViewChild('closeButtonUpd') closeButtonUpd: ElementRef;
  @ViewChild('inputSelect') inputSelect: ElementRef

  private users: User[]
  private loading: boolean = true;
  private loadingAction = false;
  private isNull: boolean = false;
  private pipeName: FilterNamePipe
  private selectedUser: User
  private typeError: boolean = false

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this._userService.getAll()
      .subscribe(
        data => {
          this.loading = false
          this.users = data
        },
        error => {
          console.log(error)
        }
      )
  }

  delete(id){
    this.loadingAction = true;
    this._userService.delete(id)
      .subscribe(
        res => {
          this.loadingAction = false;
          this.triggerFalseClick('')
          this.getAll()
        },
        error => {
          this.loadingAction = false;
        }
      )
  }

  changeUser(id){
    this.loadingAction = true
    this.typeError = false
    let optionType = this.inputSelect.nativeElement.selectedOptions[0].value
    if (['adm','student','invited'].includes(optionType)) {
      let updateType = new FormData
      updateType.append('type',optionType)
      this._userService.updateType(updateType,id)
        .subscribe(
          res => {
            this.loadingAction = false
            this.triggerFalseClick('upd')
            this.getAll()
          },
          error => {
            this.loadingAction = false
          }
        )
    }
    else 
      this.typeError = true;
  }

  getCLickedUser(user){
    this.selectedUser = user
  }

  triggerFalseClick(str) {
    let el: HTMLElement
    if (str == 'upd')
      el = this.closeButtonUpd.nativeElement as HTMLElement;
    else
      el = this.closeButton.nativeElement as HTMLElement
    el.click();
  }

}
