import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-content',
  templateUrl: './category-content.component.html',
  styleUrls: ['./category-content.component.css']
})
export class CategoryContentComponent implements OnInit {

  private id

  constructor(private active: ActivatedRoute) { }

  ngOnInit() {
    this.active.params.subscribe(param => {
      if(param['id']){
        this.id = param['id']
      }
    })
  }

}
