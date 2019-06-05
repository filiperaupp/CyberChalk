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
          this.contents = responseList[0]
          this.courses = responseList[1]
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

}
