import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from 'src/app/admin/category-theme-control/category/category.service';
import { Category } from 'src/app/models/category';
import { ThemeService } from 'src/app/admin/category-theme-control/theme/theme.service';
import { Theme } from 'src/app/models/theme';
import { MyCoursesService } from '../my-courses/my-courses.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  courseForm = this.fb.group({
    category: ['', Validators.required],
    theme_id: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required]
  })

  themes: Theme[] = []
  categories: Category[] = []
  themeByCategory: Theme[] = []
  courseEdit: any


  loading = false
  id: number
  actionText: string

  contentManage: false

  constructor(private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _themeService: ThemeService,
    private active: ActivatedRoute,
    private _myCoursesService: MyCoursesService) { }

  ngOnInit() {
    this.id = null
    this.active.params.subscribe(param => {
      if (param['id']) {
        this.id = param['id']
        this.actionText = "Editar"
        this.getAllCategories()
        this.getAllThemes()
        this.getCourse()
      } else {
        this.actionText = "Criar"
        this.getAllCategories()
        this.getAllThemes()
      }
    })
  }

  onSubmit() {
    let course = this.courseForm.value
    if (this.id) {
      this._myCoursesService.update(this.id, course)
        .subscribe(
          res => console.log(res),
          error => console.log(error)
        )
    } else {
      this._myCoursesService.post(course)
        .subscribe(
          res => console.log(res),
          error => console.log(error)
        )
    }
  }

  getCourse() {
    this._myCoursesService.getById(this.id)
      .subscribe(
        (data: any) => {
          this.courseEdit = data
          this.setFormToCourseEdit()
        }
      )
  }

  getAllCategories() {
    this._categoryService.getAll()
      .subscribe(
        (data: Category[]) => this.categories = data
      )
  }

  getAllThemes() {
    this._themeService.getAll()
      .subscribe(
        (data: Theme[]) => this.themes = data
      )
  }

  findThemes() {
    let category_id = this.courseForm.controls['category'].value
    this.getThemesByCategory(category_id)
  }

  getThemesByCategory(id) {
    this.themeByCategory = this.themes.filter(t => t.category_id == id)
  }

  setFormToCourseEdit() {
    this.courseForm.controls['title'].setValue(this.courseEdit.title)
    let theme_id = this.courseEdit.theme_id
    let category_id = this.themes.find(t => t.id == this.courseEdit.theme_id).category_id
    this.courseForm.controls['category'].setValue(category_id)
    this.getThemesByCategory(category_id)
    this.courseForm.controls['theme_id'].setValue(theme_id)
    this.courseForm.controls['description'].setValue(this.courseEdit.description)
  }

}
