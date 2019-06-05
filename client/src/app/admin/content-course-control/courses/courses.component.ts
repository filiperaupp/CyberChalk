import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MyCoursesService } from 'src/app/user-stuff/my-courses/my-courses.service';
import { FilterStatusPipe } from 'src/app/pipes/filter-status.pipe';

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

  filterStatus: FilterStatusPipe
  status = 'pending'

  constructor(private _myCoursesService: MyCoursesService) { }

  ngOnInit() {
    this.getAllCourses()
  }

  getAllCourses(){
    this._myCoursesService.getAll()
      .subscribe(
        (data: any[]) => {
          this.courses = data
          console.log(data)
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
    let idCourse = this.selectedCourse.id
    let formAction = new FormData()
    formAction.append('status', action)
    this._myCoursesService.changeStatus(idCourse, formAction)
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
      case 'approved':
        el = this.closeButtonApprove.nativeElement as HTMLElement
        break;
      case 'rejected':
        el = this.closeButtonReject.nativeElement as HTMLElement
        break;
      case 'recycled':
        el = this.closeButtonRecycle.nativeElement as HTMLElement        
        break
      default:
        break;
    }
    el.click();
  }
}