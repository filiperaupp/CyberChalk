import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FilterNamePipe } from 'src/app/pipes/filter-name.pipe';
import { Category } from 'src/app/models/category';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @ViewChild('closeButtonAdd') closeButtonAdd: ElementRef;
  @ViewChild('closeButtonDel') closeButtonDel: ElementRef;
  @ViewChild('closeButtonUpd') closeButtonUpd: ElementRef;

  private categories: Category[]
  private loading: boolean = true;
  private loadingAction: boolean = false
  private isNull: boolean = false;
  private selectedCategory: Category
  private pipeName: FilterNamePipe

  newCategoryForm = this.fb.group({
    name: ['', Validators.required],
    session: ['', Validators.required]
  })

  constructor(private _categoryService: CategoryService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this._categoryService.getAll()
      .subscribe(
        (data:Category[]) => {
          console.log(data)
          this.categories = data;
          this.loading = false
        },
        error => {
          console.log(error)
          this.loading = false
        }
      )
  }

  onSubmit(){
    this.loadingAction = true
    let newCategory = this.newCategoryForm.value;
    this._categoryService.create(newCategory)
      .subscribe(
        res => {
          console.log(res)
          this.loadingAction = false
          this.triggerFalseClick('add')
          this.getAll()
        },
        error => {
          console.log(error)
          this.loadingAction = false
        }
      )
  }

  getClickedCategory(category:Category){
    this.selectedCategory = category
  }

  delete(id){
    this.loadingAction = true
    this._categoryService.delete(id)
      .subscribe(
        res => {
          console.log(res)
          this.loadingAction = false
          this.triggerFalseClick('')
          this.getAll()
        },
        error => {
          console.log(error)
          this.loadingAction = false
          this.triggerFalseClick('')
        }
      )
  }

  toUpdate(category){
    this.selectedCategory = category
    this.newCategoryForm.controls['session'].setValue(this.selectedCategory.session)
    this.newCategoryForm.controls['name'].setValue(this.selectedCategory.name)
  }

  onUpdate(){
    this.loadingAction = true
    let updatedCategory = this.newCategoryForm.value
    this._categoryService.update(this.selectedCategory.id, updatedCategory)
      .subscribe(
        res => {
          console.log(res)
          this.loadingAction = false
          this.triggerFalseClick('upd')
          this.getAll()
        },
        error => {
          console.log(error)
        }
      )
  }

  triggerFalseClick(action) {
    let el: HTMLElement
    if (action == 'add')
      el = this.closeButtonAdd.nativeElement as HTMLElement
    else if (action =='upd')
      el = this.closeButtonUpd.nativeElement as HTMLElement
    else
      el = this.closeButtonDel.nativeElement as HTMLElement
    el.click();
  }

}
