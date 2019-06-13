import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from './comment.service';

@Component({
  selector: 'comments',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comments

  private user
  private selectedComment
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
    this._commentService.deleteComment(this.selectedComment.id)
      .subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      )
  }

  urlImage(comment){
    if (comment.user.profile_photo != null)
      return 'url(http://localhost:8000/storage/'+comment.user.profile_photo+')'
    else
      return 'url(../../../../../assets/images/user.png)'
  }

}
