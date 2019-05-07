import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FilterNamePipe } from 'src/app/pipes/filter-name.pipe';
import { ThemeService } from './theme.service';
import { Theme } from 'src/app/models/theme';
import { CategoryService } from '../category/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  
  @ViewChild('closeButtonAdd') closeButtonAdd: ElementRef;
  @ViewChild('closeButtonDel') closeButtonDel: ElementRef;
  @ViewChild('closeButtonUpd') closeButtonUpd: ElementRef;

  private themes: Theme[]
  private categories: Category[]
  private selectedTheme: Theme

  private loading: boolean = true;
  private loadingAction: boolean = false
  private isNull: boolean = false;

  private pipeName: FilterNamePipe

  newThemeForm = this.fb.group({
    name: ['', Validators.required],
    category_id: ['', Validators.required]
  })

  constructor(private fb: FormBuilder,
              private _themeService: ThemeService,
              private _categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategories()
  }

  findCategoryName(category_id){
    return this.categories.find(cat => cat.id == category_id).name
  }

  getAllThemes(){
    this._themeService.getAll()
      .subscribe(
        (data:Theme[]) => {
          this.themes = data
          this.loading = false
        },
        error => {
          console.log(error)
          this.loading = false
        }
      )
  }

  getAllCategories(){
    this.loading = true
    this._categoryService.getAll()
      .subscribe(
        (data:Category[]) => {
          this.categories = data.sort(this.compare)
          this.getAllThemes()
        },
        error => {
          console.log(error)
        }
      )
  }
  
  onSubmit(){
    this.loadingAction = true
    let newTheme = this.newThemeForm.value
    this._themeService.post(newTheme)
      .subscribe(
        res => {
          console.log(res)
          this.loadingAction = false
          this.triggerFalseClick('add')
          this.getAllCategories()
        },
        error => {
          console.log(error)
        }
      )
  }

  delete(id){
    this.loadingAction = true
    this._themeService.delete(id)
    .subscribe(
      res => {
        console.log(res)
        this.triggerFalseClick('')
        this.getAllCategories()
        this.loadingAction = false
      },
      error => {
        console.log(error)
        this.loadingAction = false
      }
    )
  }

  toUpdate(theme){
    this.selectedTheme = theme
    this.newThemeForm.controls['category_id'].setValue(theme.category_id)
    this.newThemeForm.controls['name'].setValue(theme.name)
  }

  onUpdate(){
    this.loadingAction = true
    let updatedTheme = this.newThemeForm.value
    this._themeService.update(this.selectedTheme.id, updatedTheme)
      .subscribe(
        res => {
          console.log(res)
          this.loadingAction = false
          this.triggerFalseClick('upd')
          this.getAllThemes()
        },
        error => {
          console.log(error)
          this.loadingAction = false
        }
      )

  }

  getSelectedTheme(theme:Theme){
    this.selectedTheme = theme
  }

  compare( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

  triggerFalseClick(action) {
    let el: HTMLElement
    if (action == 'add')
      el = this.closeButtonAdd.nativeElement as HTMLElement
    else if (action == 'upd')
      el = this.closeButtonUpd.nativeElement as HTMLElement
    else
      el = this.closeButtonDel.nativeElement as HTMLElement
    el.click();
    this.newThemeForm.reset()
  }

}
