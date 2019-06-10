import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ThemeContentService } from './theme-content.service';

@Component({
  selector: 'app-theme-content',
  templateUrl: './theme-content.component.html',
  styleUrls: ['./theme-content.component.css']
})
export class ThemeContentComponent implements OnInit {

  private id
  private theme
  private loading: boolean = true

  private contents
  private courses
  private selectedContent
  private isShowContent: boolean = false

  
  rosca: string = "olá"

  constructor(private active: ActivatedRoute,
              private _themeContentService: ThemeContentService) { }

  ngOnInit() {
    this.active.params.subscribe(param => {
      if(param['idTh']){
        this.id = param['idTh']
        this.getMaterial()
      }
    })
  }

  getMaterial(){
    this._themeContentService.getMaterial(this.id)
      .subscribe(
        (responseList) => {
          console.log(responseList)
          this.contents = responseList[0].sort(this.compare)
          this.courses = responseList[1].sort(this.compare)
          this.theme = responseList[2]
          this.loading = false
        }
      )
  }

  getSelectedContent(content){
    this.selectedContent = content
    this.isShowContent = true
    console.log(this.selectedContent)
  }

  like(material, materialType){
    let newLike = new FormData
    if (materialType == 'course')
      newLike.append('course_id',material.id)
    else if (materialType == 'content')
      newLike.append('content_id',material.id)
    this._themeContentService.like(newLike)
      .subscribe(
        (data) => {
          console.log(data)
          material.isLike = data
          material.likes += 1
        },
        (error) => console.log(error)
      )
  }

  unlike(material, materialType) {
    let removeLike = new FormData
    if (materialType == 'course')
      removeLike.append('course_id',material.id)
    else if (materialType == 'content')
      removeLike.append('content_id',material.id)
    this._themeContentService.unlike(removeLike)
      .subscribe(
        (data) => {
          console.log(data)
          material.isLike = data
          material.likes += -1
        }
      )
  }

  compare( a, b ) {
    if ( a.likes < b.likes ){
      return 1;
    }
    if ( a.likes > b.likes ){
      return -1;
    }
    return 0;
  }

}
