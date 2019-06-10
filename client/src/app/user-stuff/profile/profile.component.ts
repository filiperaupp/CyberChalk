import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private user
  loading: boolean = true
  loadingAction: boolean = false
  inEdit: boolean = false
  profilePhoto:any
  
  private editForm = this.fb.group({})
  constructor(private sanitizer: DomSanitizer,
              private fb: FormBuilder,
              private _profileService: ProfileService,
              private _sharedService: SharedService) { }

  ngOnInit() {
    this.getUser()
    this._sharedService.emitChange('Data from child')
  }

  getUser(){
    this._profileService.getUser()
      .subscribe(
        (data) => {
          this.user = data
          this.editForm = this.fb.group({
            name: [this.user.name, Validators.required],
            email: [this.user.email, [Validators.required, Validators.email]]
          })
          this.loading = false
        }
      )
  }

  onSubmit(){
    this.loadingAction = true
    let updatedData = this.editForm.value
    this._profileService.updateUser(updatedData)
      .subscribe(
        (data) => {
          this.user.name = this.editForm.controls['name'].value
          this.user.email = this.editForm.controls['email'].value
          this.loadingAction = false
          this.inEdit = false 
        }
      )
  }

  changePhoto(event){
    if (event.target.files[0]){
      let photo = new FormData()
      photo.append('profile_photo', event.target.files[0])
      this._profileService.changeProfilePhoto(photo)
        .subscribe(
          (data) =>{
            this.user.profile_photo = data
            this._sharedService.emitChange(this.user.profile_photo)
          },
          (error) => console.log(error)
        )
    }
  }

  urlImage(){
    return 'url(http://localhost:8000/storage/'+this.user.profile_photo+')'
  }

}
