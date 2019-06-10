import { Component, OnInit } from '@angular/core';
import { MyProgressService } from './my-progress.service';

@Component({
  selector: 'app-my-progress',
  templateUrl: './my-progress.component.html',
  styleUrls: ['./my-progress.component.css']
})
export class MyProgressComponent implements OnInit {

  private courses
  loading:boolean = true

  constructor(private _myProgressService: MyProgressService) { }

  ngOnInit() {
    this.getProgress()
  }

  getProgress(){
    this._myProgressService.getProgress()
      .subscribe(
        (data) => {
          this.courses = data
          console.log(data)
          this.loading = false
        }
      )
  }

}
