import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MyCoursesService } from '../my-courses/my-courses.service';

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.css']
})
export class ContentItemComponent implements OnInit {

  contentsInCourse: any[] = []
  idCourse: number

  loading = true

  constructor(private active: ActivatedRoute,
              private _myCourseService: MyCoursesService) { }

  ngOnInit() {
    this.idCourse = null
    this.active.parent.params.subscribe(param => {
      if (param['id']) {
        this.idCourse = param['id']
        this.getContents()
      }
    })
  }

  changePosition(indexLeft,indexRight){
    let leftContent = this.contentsInCourse[indexLeft];
    let rightContent = this.contentsInCourse[indexRight];
    this._myCourseService.changePosition(rightContent.id,leftContent.id)
      .subscribe(
        res => {
          this.contentsInCourse.splice((indexLeft),0, this.contentsInCourse.splice(indexRight,1)[0])
        },
        error => console.log(error)
      )
  }

  getContents(){
    this._myCourseService.getContentsByCourseId(this.idCourse)
      .subscribe(
        (data: any[]) => {
          this.contentsInCourse = data
          this.loading = false
          console.log(this.contentsInCourse)
        },
        (error) => console.log(error)
      )
  }

  delete(idContent,index){
    this._myCourseService.deleteContent(idContent)
      .subscribe(
        (res) => this.contentsInCourse.splice(index,1),
        (error) => console.log(error)
      )
  }
}
