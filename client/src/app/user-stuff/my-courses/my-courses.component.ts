import { Component, OnInit } from '@angular/core';

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

  courses: any[] = []
  themes: Theme[] = []
  categories: Category[] = []

  loading = true

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
  
  delete(id) {
    this._myCoursesService.delete(id)
      .subscribe(
        res => console.log(res),
        error => console.log(error)
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

}
