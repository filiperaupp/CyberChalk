import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { MyCoursesService } from './my-courses.service';
import { Theme } from 'src/app/models/theme';
import { Category } from 'src/app/models/category';
import { FilterStatusPipe } from 'src/app/pipes/filter-status.pipe';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  @ViewChild('closeButtonDelete') closeButtonDelete: ElementRef;
  @ViewChild('closeButtonSend') closeButtonSend: ElementRef;
  @ViewChild('closeButtonCancel') closeButtonCancel: ElementRef;

  courses: any[] = []
  themes: Theme[] = []
  categories: Category[] = []

  selectedCourse: any
  loading = true
  loadingAction = false

  private filterStatus: FilterStatusPipe
  status = ''

  constructor(private _myCoursesService: MyCoursesService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this._myCoursesService.getCoursesByUser()
      .subscribe(
        (data: any[]) => {
          this.courses = data
          this.loading = false
        },
        (error) => console.log(error)
      )
  }

  getSelectedCourse(course) {
    this.selectedCourse = course
  }

  removeFromList() {
    let removedContentIndex = this.courses.indexOf(this.selectedCourse)
    this.courses.splice(removedContentIndex, 1)
  }

  changeStatus(status) {
    this.loadingAction = true
    let newStatus = new FormData()
    newStatus.append('status', status)
    this._myCoursesService.changeStatus(this.selectedCourse.id, newStatus)
      .subscribe(
        res => {
          this.selectedCourse.status = res
          this.loadingAction = false
          this.triggerFalseClick(status)
        }
      )
  }

  delete(id) {
    this.loadingAction = true
    this._myCoursesService.delete(id)
      .subscribe(
        res => {
          this.loadingAction = false
          this.removeFromList()
          this.triggerFalseClick('delete')
        },
        error => {
          console.log(error)
        }
      )
  }

  triggerFalseClick(action) {
    let el: HTMLElement
    switch (action) {
      case 'delete':
        el = this.closeButtonDelete.nativeElement as HTMLElement
        break;
      case 'pending':
        el = this.closeButtonSend.nativeElement as HTMLElement
        break;
      case 'canceled':
        el = this.closeButtonCancel.nativeElement as HTMLElement
      default:
        break;
    }
    el.click();
  }

}
