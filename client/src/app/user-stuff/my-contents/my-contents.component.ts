import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MyContentsService } from './my-contents.service';
import { ThemeService } from 'src/app/admin/category-theme-control/theme/theme.service';
import { Theme } from 'src/app/models/theme';

@Component({
  selector: 'app-my-contents',
  templateUrl: './my-contents.component.html',
  styleUrls: ['./my-contents.component.css']
})
export class MyContentsComponent implements OnInit {
  @ViewChild('closeButtonDel') closeButtonDel: ElementRef;

  private loading: boolean = true
  private loadingAction = false
  private loadingThemes:boolean = false
  private contentSolicitations: any[]
  private themes: Theme[] = []
  private selectedContent: any

  constructor(private _myContentService: MyContentsService,
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

  getSelectedContent(content){
    this.selectedContent = content
  }

  removeFromList(){
    let removedContentIndex = this.contentSolicitations.indexOf(this.selectedContent)
    this.contentSolicitations.splice(removedContentIndex,1)
  }

  sendContent(idContent){
    let content = new FormData()
    content.append('content', '')
    this._myContentService.sendToApprove(idContent, content)
      .subscribe(
        res => console.log(res),
        error => console.log(error)
      )
  }

  delete(id) {
    this.loadingAction = true
    this._myContentService.delete(id)
      .subscribe(
        res => {
          this.loadingAction = false
          this.removeFromList()
          this.triggerFalseClick()
        },
        error => {
          this.loadingAction = false
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

  triggerFalseClick() {
    let  el = this.closeButtonDel.nativeElement as HTMLElement
    el.click();
  }
}
