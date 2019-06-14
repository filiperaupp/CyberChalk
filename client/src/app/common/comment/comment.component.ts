import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommentService } from './comment.service';

@Component({
  selector: 'comments',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @ViewChild('closeButtonDel') closeButtonDel: ElementRef;
  @Input() comments: any[]

  private user
  private selectedComment
  private loadingAction:boolean = false
  //private loading:boolean = true
  
  constructor(private _commentService: CommentService) {}
  
  ngOnInit() {
    this._commentService.getUserLogged()
      .subscribe(
        (data) =>  {
          this.user = data
        }
      )
  }

  getSelectedComment(comment){
    this.selectedComment = comment
  }

  delete(){
    this.loadingAction = true
    this._commentService.deleteComment(this.selectedComment.id)
      .subscribe(
        (data) => {
          let indexComment = this.comments.findIndex(c => c == this.selectedComment)
          this.comments.splice(indexComment,1)
          this.loadingAction = false
          this.triggerFalseClick()
        },
        (error) => console.log(error)
      )
  }

  urlImage(comment){
    if (comment.user.profile_photo != null)
      return 'url(http://localhost:8000/storage/'+comment.user.profile_photo+')'
    else
      return 'url(../../../../../assets/images/user.png)'
  }

  triggerFalseClick() {
    let el = this.closeButtonDel.nativeElement as HTMLElement
    el.click();
  }

}
