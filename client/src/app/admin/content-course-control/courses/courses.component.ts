import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MyCoursesService } from 'src/app/user-stuff/my-courses/my-courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  @ViewChild('closeButtonReject') closeButtonReject: ElementRef;
  @ViewChild('closeButtonApprove') closeButtonApprove: ElementRef;
  @ViewChild('closeButtonRecycle') closeButtonRecycle: ElementRef;

  courses: any[] = []
  selectedCourse: any

  loading:boolean = true
  loadingAction:boolean = false

  constructor(private _myCoursesService: MyCoursesService) { }

  ngOnInit() {
    this.getAllCourses()
  }

  getAllCourses(){
    this._myCoursesService.getAll()
      .subscribe(
        (data: any[]) => {
          this.courses = data
          this.loading = false
        },
        (error) => console.log(error)
      )
  }

  getSelectedCourse(course){
    this.selectedCourse = course
  }

  changeStatus(action){
    this.loadingAction = true
    let idContent = this.selectedCourse.id
    let formAction = new FormData()
    formAction.append('action', action)
    this._myCoursesService.changeStatus(idContent, formAction)
      .subscribe(
        (res) => {
          console.log(res)
          this.loadingAction = false
          this.selectedCourse.status = res
          this.triggerFalseClick(action)
        },
        (error) => console.log(error)
      )
  }

  triggerFalseClick(action) {
    let  el: HTMLElement
    switch (action) {
      case 'approve':
        el = this.closeButtonApprove.nativeElement as HTMLElement
        break;
      case 'reject':
        el = this.closeButtonReject.nativeElement as HTMLElement
        break;
      case 'recycle':
        el = this.closeButtonRecycle.nativeElement as HTMLElement        
        break
      default:
        break;
    }
    el.click();
  }
}
