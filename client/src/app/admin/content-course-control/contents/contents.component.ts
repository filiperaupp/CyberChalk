import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


import { MyContentsService } from 'src/app/user-stuff/my-contents/my-contents.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent implements OnInit {
  @ViewChild('closeButtonReject') closeButtonReject: ElementRef;
  @ViewChild('closeButtonApprove') closeButtonApprove: ElementRef;
  @ViewChild('closeButtonRecycle') closeButtonRecycle: ElementRef;

  contents: any[] = []
  selectedContent: any

  loading: boolean = true
  loadingAction: boolean = false

  constructor(private _myContentsService: MyContentsService) { }

  ngOnInit() {
    this.getAllContents()
  }

  getAllContents(){
    this._myContentsService.getAll()
      .subscribe(
        (data: any[]) => {
          this.contents = data
          this.loading = false
        },
        (error) => console.log(error)
      )
  }

  getSelectedContent(content){
    this.selectedContent = content
  }


  changeStatus(action){
    this.loadingAction = true
    let idContent = this.selectedContent.id
    this._myContentsService.changeStatus(action,idContent,this.selectedContent)
      .subscribe(
        (res) => {
          console.log(res)
          this.loadingAction = false
          this.selectedContent.status = res
          this.triggerFalseClick(action)
        },
        (error) => console.log(error)
      )
  }
  
  triggerFalseClick(action) {
    let  el: HTMLElement
    switch (action) {
      case 'approve':
        el = this.closeButtonApprove.nativeElement as HTMLElement
        break;
      case 'reject':
        el = this.closeButtonReject.nativeElement as HTMLElement
        break;
      case 'recycle':
        el = this.closeButtonRecycle.nativeElement as HTMLElement        
        break
      default:
        break;
    }
    el.click();
  }

}
