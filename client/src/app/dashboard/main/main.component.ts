import { Component, OnInit } from '@angular/core';
import { ok } from 'assert';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private ranking: string[] = ['Mestre Yoda', 'Obi-Wan', 'Windu', 'C3PO', 'R2D2']
  private topUsers
  private latestContents
  private latestCourses

  private loading: boolean = true

  constructor(private _mainService: MainService) { }

  ngOnInit() {
    this.getData()
  }

  getData(){
    this._mainService.getData()
      .subscribe(
        (responseList) => {
          this.topUsers = responseList[0]
          this.latestContents = responseList[1]
          this.latestCourses = responseList[2]
          this.loading = false
        },
        (error) => console.log(error)
      )
  }

  urlImage(index){
    if (this.topUsers[index].profile_photo != null)
      return 'url(http://localhost:8000/storage/'+this.topUsers[index].profile_photo+')'
    else 
      return 'url(../../../../../assets/images/user.png)'
  }

}
