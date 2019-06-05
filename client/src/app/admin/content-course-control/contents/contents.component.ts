import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


import { MyContentsService } from 'src/app/user-stuff/my-contents/my-contents.service';
import { FilterStatusPipe } from 'src/app/pipes/filter-status.pipe';

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

  filterStatus: FilterStatusPipe
  status = 'pending'

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


  changeStatus(status){
    this.loadingAction = true
    let newStatus = new FormData();
    newStatus.append('status',status)
    this._myContentsService.changeStatus(this.selectedContent.id,newStatus)
      .subscribe(
        (res) => {
          console.log(res)
          this.loadingAction = false
          this.selectedContent.status = res
          this.triggerFalseClick(status)
        },
        (error) => console.log(error)
      )
  }
  
  triggerFalseClick(action) {
    let  el: HTMLElement
    switch (action) {
      case 'approved':
        el = this.closeButtonApprove.nativeElement as HTMLElement
        break;
      case 'rejected':
        el = this.closeButtonReject.nativeElement as HTMLElement
        break;
      case 'recycled':
        el = this.closeButtonRecycle.nativeElement as HTMLElement        
        break
      default:
        break;
    }
    el.click();
  }

}
