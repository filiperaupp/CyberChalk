import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { MyContentsService } from '../my-contents/my-contents.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/admin/category-theme-control/category/category.service';
import { Theme } from 'src/app/models/theme';
import { ThemeService } from 'src/app/admin/category-theme-control/theme/theme.service';

@Component({
  selector: 'app-content-manage',
  templateUrl: './content-manage.component.html',
  styleUrls: ['./content-manage.component.css']
})
export class ContentManageComponent implements OnInit {

  contentForm = this.fb.group({
    category: ['', Validators.required],
    theme: ['', Validators.required],
    title: ['', Validators.required],
    video: [''],
    support_files: [''],
    support_text: ['', Validators.required]
  })

  addThemeForm = this.fb.group({
    category_id: ['', Validators.required],
    theme_id: ['', Validators.required],
  })

  id: number
  contentEdit: any
  categories: Category[]
  themes: Theme[]
  themeByCategory: Theme[] = []

  loading: boolean = true
  loadingEdit:boolean = true

  files: any[] = []
  video: any = null

  constructor(private fb: FormBuilder,
    private active: ActivatedRoute,
    private _categoryService: CategoryService,
    private _themeService: ThemeService,
    private _myContentService: MyContentsService) { }

  ngOnInit() {
    this.active.params.subscribe(param => {
      if (param['id']) {
        this.id = param['id']
        this.getCategories()
        this.getThemes()
        this.getContent(this.id)
      } else {
        this.getCategories()
        this.getThemes()
        this.loadingEdit = false
      }
    })
  }

  onChangeVideo(event) {
    this.video = event.target.files[0]
  }

  onChangeFiles(event) {
    this.files = event.target.files
  }

  onSubmit() {
    let title = this.contentForm.controls['title'].value
    let support_text = this.contentForm.controls['support_text'].value
    let theme_id = this.contentForm.controls['theme'].value
    let newContent = new FormData()

    newContent.append('title', title)
    newContent.append('support_text', support_text)
    newContent.append('video', this.video)
    newContent.append('theme_id', theme_id)
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        newContent.append('support_files[]', this.files[i])
      }
    }
    this._myContentService.post(newContent)
      .subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.log(error)
        }
      )
  }

  // To create new content
  getCategories() {
    this._categoryService.getAll()
      .subscribe(
        (data: Category[]) => {
          this.categories = data;
        },
        error => {
          console.log(error)
        }
      )
  }

  getThemes() {
    this._themeService.getAll()
      .subscribe(
        (data: Theme[]) => {
          this.themes = data;
          this.loading = false
        },
        error => {
          console.log(error)
        }
      )
  }

  findThemes(){
    let category_id = this.contentForm.controls['category'].value
    this.getThemesByCategory(category_id)
  }

  // --------------------------------

  //Edit content 
  getThemesByCategory(id) {
    this.themeByCategory = this.themes.filter(t => t.category_id == id)
  }

  getContent(id) {
    this._myContentService.getById(id)
      .subscribe(
        data => {
          console.log(data)
          this.contentEdit = data
          this.loadingEdit = false
          this.setFormToContentEdit()
        },
        error => {
          console.log(error)
        }
      )
  }

  setFormToContentEdit() {
    this.contentForm.controls['title'].setValue(this.contentEdit.title)
    let theme_id = this.contentEdit.theme_id
    let category_id = this.themes.find(t => t.id == this.contentEdit.theme_id).category_id
    this.contentForm.controls['category'].setValue(category_id)
    this.getThemesByCategory(category_id)
    this.contentForm.controls['theme'].setValue(theme_id)
  }



}
