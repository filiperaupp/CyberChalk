import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MyContentsService } from './my-contents.service';
import { ThemeService } from 'src/app/admin/category-theme-control/theme/theme.service';
import { Theme } from 'src/app/models/theme';

@Component({
  selector: 'app-my-contents',
  templateUrl: './my-contents.component.html',
  styleUrls: ['./my-contents.component.css']
})
export class MyContentsComponent implements OnInit {

  newFileForm = this.fb.group({
    photo: ['', Validators.required],
  })

  private loading: boolean = true;
  private loadingThemes:boolean = false
  private contentSolicitations: any[]
  private themes: Theme[] = []

  fileData = new FormData()

  constructor(private fb: FormBuilder,
              private _myContentService: MyContentsService,
              private _themeService: ThemeService) { }

  ngOnInit() {
    this.getAll()
    this.getAllThemes()
  }

  getAll(){
    this._myContentService.getAll()
      .subscribe(
        (res: any[] ) => {
          this.contentSolicitations = res
          this.loading = false
        },
        error => {
          console.log(error)
        }
      )
  }

  delete(id) {
    this._myContentService.delete(id)
      .subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.log(error)
        }
      )
  }

  getThemeName(id){
    return this.themes.find(t => t.id == id).name
  }

  getAllThemes(){
    this.loadingThemes = true
    this._themeService.getAll()
      .subscribe(
        (data: Theme[]) => {
          this.themes = data
          this.loadingThemes = false
        },
        error => {
          console.log(error)
          this.loadingThemes = false
        }
      )
  }

}
