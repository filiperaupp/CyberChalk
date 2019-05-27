import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


import { MyCoursesService } from '../my-courses/my-courses.service';
import { MyContentsService } from '../my-contents/my-contents.service';

@Component({
  selector: 'app-content-to-course',
  templateUrl: './content-to-course.component.html',
  styleUrls: ['./content-to-course.component.css']
})
export class ContentToCourseComponent implements OnInit {

  contentForm = this.fb.group({
    title: ['', Validators.required],
    video: [''],
    support_files: [''],
    support_text: ['', Validators.required]
  })

  actionText: string
  idCourse: number
  idContent: number
  contentEdit: any

  loading: boolean = true

  files: any[] = []
  video: any = null

  filesToDelete: any[] = []
  videoToDelete: any = null

  constructor(private fb: FormBuilder,
    private active: ActivatedRoute,
    private _myContentService: MyContentsService,
    private _myCouseService: MyCoursesService) { }

  ngOnInit() {
    this.idCourse = null
    this.filesToDelete = []
    this.active.parent.params.subscribe(param => {
      if (param['id']) {
        this.idCourse = param['id']
      }
    })
    this.active.params.subscribe(param => {
      if (param['id']) {
        this.idContent = param['id']
        this.actionText = "Editar"
        this.getContent(this.idContent)
      } else {
        this.actionText = "Criar"
        this.loading = false
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

    contentSolicitation.append('course_id', `${this.idCourse}`)
    console.log(this.idCourse)
    contentSolicitation.append('title', title)
    contentSolicitation.append('support_text', support_text)
    contentSolicitation.append('video', this.video)
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        contentSolicitation.append('support_files[]', this.files[i])
      }
    }

    if (this.idContent) {
      contentSolicitation.append('id', `${this.idContent}`)
      //files to delete
      if (this.filesToDelete.length > 0) {
        this.filesToDelete.forEach(file => {
          contentSolicitation.append('filesToDelete[]', file.id)
        });
      }
      //video to delete
      if (this.videoToDelete != null) {
        contentSolicitation.append('videoToDelete', this.videoToDelete)
        console.log(this.videoToDelete)
      }

      this._myContentService.postTeste(contentSolicitation)
        .subscribe(
          res => console.log(res),
          error => console.log(error)
        )
    } else {
      this._myCouseService.addContentToCourse(contentSolicitation)
        .subscribe(
          res => console.log(res),
          error => console.log(error)
        )
    }

  }

  // --------------------------------

  //Edit content 
  downloadVideo(id) {
    window.location.href = `http://localhost:8000/api/downloadVideo/${id}`
  }

  downloadFile(id) {
    window.location.href = `http://localhost:8000/api/downloadFile/${id}`
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
          console.log(this.contentEdit)
          this.loading = false
          this.setFormToContentEdit()
        },
        error => {
          console.log(error)
        }
      )
  }

  setFormToContentEdit() {
    this.contentForm.controls['title'].setValue(this.contentEdit.title)
    this.contentForm.controls['support_text'].setValue(this.contentEdit.support_text)
  }

}
