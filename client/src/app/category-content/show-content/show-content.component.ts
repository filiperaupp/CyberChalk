import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { ShowContentService } from './show-content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'show-content',
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.css']
})
export class ShowContentComponent implements OnInit {
  @Input() idContent

  private id
  private content
  private loading: boolean = true
  private insideCourse = false

  commentForm = this.fb.group({
    commentText: ['', Validators.required]
  })

  constructor(private active: ActivatedRoute,
              private _showContentService: ShowContentService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.active.params.subscribe(param => {
      if(param['idCo']){
        this.id = param['idCo']
        this.getContent()
      } else {
        this.id = this.idContent
        this.insideCourse = true
        this.getContent()
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const idContent: SimpleChange = changes.idContent;
    if (idContent.previousValue != idContent.currentValue) {
      this.id = idContent.currentValue
      this.loading = true
      this.getContent()
    }
  }

  onSubmit(){
    let newComment = new FormData
    newComment.append('text', this.commentForm.controls['commentText'].value)
    newComment.append('content_id', this.content.id)
    this._showContentService.postComment(newComment)
      .subscribe(
        (data) => {
          console.log(data)
        },
        (error) => console.log(error)
      )
  }

  getContent(){
    this._showContentService.getContent(this.id)
      .subscribe(
        (data) => {
          this.content = data
          this.loading = false
        },
        (error) => console.log(error)
      )
  }

  downloadFile(id) {
    window.location.href = `http://localhost:8000/api/downloadFile/${id}`
  }

}