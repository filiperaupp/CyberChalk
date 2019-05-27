import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { MyCoursesService } from './my-courses.service';
import { CategoryService } from 'src/app/admin/category-theme-control/category/category.service';
import { ThemeService } from 'src/app/admin/category-theme-control/theme/theme.service';
import { Theme } from 'src/app/models/theme';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  @ViewChild('closeButtonDel') closeButtonDel: ElementRef;

  courses: any[] = []
  themes: Theme[] = []
  categories: Category[] = []

  selectedCourse: any
  loading = true
  loadingAction = false

  constructor(private _myCoursesService: MyCoursesService,
    private _categoryService: CategoryService,
    private _themeServixce: ThemeService) { }

  ngOnInit() {
    this.getAll()
    this.getAllCategories()
  }

  getAll() {
    this._myCoursesService.getAll()
      .subscribe(
        (data: any[]) => this.courses = data,
        (error) => console.log(error)
      )
  }

  getSelectedCourse(course){
    this.selectedCourse = course
  }

  removeFromList(){
    let removedContentIndex = this.courses.indexOf(this.selectedCourse)
    this.courses.splice(removedContentIndex,1)
  }

  sendCourse(idCourse){
    let course = new FormData()
    course.append('course', JSON.stringify(this.selectedCourse))
    this._myCoursesService.sendToApprovre(idCourse,course)
      .subscribe(
        res => console.log(res),
        error => console.log(error)
      )
  }
  
  delete(id) {
    this.loadingAction = true
    this._myCoursesService.delete(id)
      .subscribe(
        res => {
          this.loadingAction = false
          this.removeFromList()
          this.triggerFalseClick()
        },
        error => {
          console.log(error)
          this.loadingAction = false
          this.removeFromList()
          this.triggerFalseClick()
        }
      )
  }

  getAllCategories() {
    this._categoryService.getAll()
      .subscribe(
        (data: Category[]) => {
          this.categories = data
          this.getAllThemes()
        }
      )
  }

  getAllThemes() {
    this._themeServixce.getAll()
      .subscribe(
        (data: Theme[]) => {
          this.themes = data
          this.loading = false
        }
      )
  }

  getThemeName(idTheme) {
    let themeName = this.themes.find(t => t.id == idTheme).name
    return themeName
  }

  getCategoryName(idTheme) {
    let idCategory = this.themes.find(t => t.id == idTheme).category_id
    let categoryName = this.categories.find(c => c.id == idCategory).name
    return categoryName
  }

  triggerFalseClick() {
    let  el = this.closeButtonDel.nativeElement as HTMLElement
    el.click();
  }

}
