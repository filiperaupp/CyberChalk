import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Theme } from '../models/theme';
import { CategoryContentService } from './category-content.service';

@Component({
  selector: 'app-category-content',
  templateUrl: './category-content.component.html',
  styleUrls: ['./category-content.component.css']
})
export class CategoryContentComponent implements OnInit {

  private id
  private category
  private themes: Theme[] = []
  private loading: boolean = true

  constructor(private active: ActivatedRoute,
              private _categoryContentService: CategoryContentService) { }

  ngOnInit() {
    this.active.params.subscribe(param => {
      if(param['id']){
        this.id = param['id']
        this.getCategoryAndThemes()
      }
    })
  }

  getCategoryAndThemes(){
    this.loading = true
    this._categoryContentService.getCategoryAndThemes(this.id)
      .subscribe(
        (responseList) => {
          this.category = responseList[0]
          this.themes = responseList[1]
          this.loading = false
        },
        (error) => console.log(error)
      )
  }



  ngDoCheck(){
  }

}
