import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShowCourseService } from './show-course.service';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit {

  private id
  private course
  private contents
  private selectedContent

  loading = true

  constructor(private active: ActivatedRoute,
              private _showCourseService: ShowCourseService) { }

  ngOnInit() {
    this.active.params.subscribe(param => {
      if(param['idCou']){
        this.id = param['idCou']
        this.getCourseAndContents()
      }
    })
  }

  getCourseAndContents(){
    this._showCourseService.getCourseAndContents(this.id)
      .subscribe(
        (responseList) => {
          this.course = responseList[0]
          this.contents = responseList[1]
          this.loading = false
        },
        (error) => console.log(error)
      )
  }

  startContent(content){
    this.selectedContent = null
    this.selectedContent = content
  }

}
