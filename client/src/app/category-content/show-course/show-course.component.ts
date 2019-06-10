import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShowCourseService } from './show-course.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit {

  private id
  private course
  private contents = []
  private selectedContent

  loading = true
  isDone = false

  constructor(private active: ActivatedRoute,
              private _location: Location,
              private _showCourseService: ShowCourseService) { }

  ngOnInit() {
    this.active.params.subscribe(param => {
      if(param['idCou']){
        this.id = param['idCou']
        this.getCourseAndContents()
      }
    })
  }

  getIndex(){
    return this.contents.findIndex(c => c == this.selectedContent)
  }

  changeContent(direction){
    let index = this.getIndex()
    if (direction=='previous') {
      this.selectedContent = this.contents[index-1]
    } else if (direction == 'next') {
      if (!this.selectedContent.isDone){
        this.doneOrUndo(this.selectedContent,'done')
      }
      this.selectedContent = this.contents[index+1]
    }
  }

  getCourseAndContents(){
    this._showCourseService.getCourseAndContents(this.id)
      .subscribe(
        (responseList) => {
          this.course = responseList[0]
          this.contents = responseList[1] as []
          this.loading = false
        },
        (error) => console.log(error)
      )
  }

  startContent(content){
    this.selectedContent = null
    this.selectedContent = content
  }

  doneOrUndo(content,action){
    let progress = new FormData()
    progress.append('content_id', `${content.id}`)
    progress.append('course_id', `${this.course.id}`)
    if (action == 'done') {
      this._showCourseService.contentDone(progress)
        .subscribe((data) => content.isDone = data)
    } else if (action == 'undo') {
      this._showCourseService.contentUndo(progress)
      .subscribe((data) => content.isDone = data)
    }
  }

  finishCourse(){
    if (!this.selectedContent.isDone)
      this.doneOrUndo(this.selectedContent,'done')
    this._location.back()
  }

}
