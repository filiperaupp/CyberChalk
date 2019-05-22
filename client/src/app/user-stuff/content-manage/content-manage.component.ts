import { ActivatedRoute, Router } from '@angular/router';
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

  actionText: string
  id: number
  contentEdit: any
  categories: Category[]
  themes: Theme[]
  themeByCategory: Theme[] = []

  loading: boolean = true
  loadingEdit: boolean = true

  files: any[] = []
  video: any = null

  filesToDelete: any[] = []
  videoToDelete: any = null

  constructor(private fb: FormBuilder,
    private active: ActivatedRoute,
    private router: Router,
    private _categoryService: CategoryService,
    private _themeService: ThemeService,
    private _myContentService: MyContentsService) { }

  ngOnInit() {
    this.id = null
    this.filesToDelete = []
    this.active.params.subscribe(param => {
      if (param['id']) {
        this.id = param['id']
        this.actionText = "Editar"
        this.getCategories()
        this.getThemes()
        this.getContent(this.id)
      } else {
        this.actionText = "Criar"
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
    let contentSolicitation = new FormData()

    let title = this.contentForm.controls['title'].value
    let support_text = this.contentForm.controls['support_text'].value
    let theme_id = this.contentForm.controls['theme'].value

    contentSolicitation.append('title', title)
    contentSolicitation.append('support_text', support_text)
    contentSolicitation.append('video', this.video)
    contentSolicitation.append('theme_id', theme_id)
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        contentSolicitation.append('support_files[]', this.files[i])
      }
    }

    if (this.id) {
      contentSolicitation.append('id', `${this.id}`)
      //files to delete
      if (this.filesToDelete.length > 0) {
        this.filesToDelete.forEach(file => {
          contentSolicitation.append('filesToDelete[]', file.id)
        });
      }
      //video to delete
      if (this.videoToDelete != null) {
        contentSolicitation.append('videoToDelete', this.videoToDelete)
      }

      this._myContentService.postTeste(contentSolicitation)
        .subscribe(
          res => console.log(res),
          error => console.log(error)
        )
    } else {
      this._myContentService.post(contentSolicitation)
        .subscribe(
          res => console.log(res),
          error => console.log(error)
        )
    }

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

  findThemes() {
    let category_id = this.contentForm.controls['category'].value
    this.getThemesByCategory(category_id)
  }

  // --------------------------------

  //Edit content 

  downloadVideo(id) {
    window.location.href = `http://localhost:8000/api/downloadVideo/${id}`
  }

  downloadFile(id) {
    window.location.href = `http://localhost:8000/api/downloadFile/${id}`
  }

  getThemesByCategory(id) {
    this.themeByCategory = this.themes.filter(t => t.category_id == id)
  }
  
  deleteVideo(idVideo) {
    this.contentEdit.video.splice(0,1)
    this.videoToDelete = idVideo
  }

  fileDelete(index) {
    let selectedFile = this.contentEdit.support_files.splice(index, 1)
    this.filesToDelete.push(selectedFile[0])
  }

  getContent(id) {
    this._myContentService.getById(id)
      .subscribe(
        data => {
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
    this.contentForm.controls['support_text'].setValue(this.contentEdit.support_text)
  }



}
