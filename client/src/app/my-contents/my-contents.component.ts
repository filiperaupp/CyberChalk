import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MyContentsService } from './my-contents.service';

@Component({
  selector: 'app-my-contents',
  templateUrl: './my-contents.component.html',
  styleUrls: ['./my-contents.component.css']
})
export class MyContentsComponent implements OnInit {

  newFileForm = this.fb.group({
    photo: ['', Validators.required],
  })

  fileData = new FormData()

  constructor(private fb: FormBuilder,
              private _myContentService: MyContentsService) { }

  ngOnInit() {
  }

  onSubmit(){
    let photo = this.newFileForm.value
    console.log(photo)

    this._myContentService.teste(photo)
      .subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.log(error)
        }
      )
  }

  troca(event){
    console.log(event.target.files[0].name)
    this.fileData.append('photo',event.target.files[0]);
    this._myContentService.teste(this.fileData)
      .subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.log(error)
        }
      )
  }

  delete(id){
    this._myContentService.testeDelete(id)
    .subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

}
