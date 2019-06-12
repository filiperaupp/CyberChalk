import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MyContentsService } from './my-contents.service';
import { FilterStatusPipe } from 'src/app/pipes/filter-status.pipe';

@Component({
  selector: 'app-my-contents',
  templateUrl: './my-contents.component.html',
  styleUrls: ['./my-contents.component.css']
})
export class MyContentsComponent implements OnInit {
  @ViewChild('closeButtonDelete') closeButtonDelete: ElementRef;
  @ViewChild('closeButtonSend') closeButtonSend: ElementRef;
  @ViewChild('closeButtonCancel') closeButtonCancel: ElementRef;

  private loading: boolean = true
  private loadingAction = false
  private contentSolicitations: any[]
  private selectedContent: any

  private filterStatus: FilterStatusPipe
  status = ''

  constructor(private _myContentService: MyContentsService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this._myContentService.getContentsByUser()
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

  changeStatus(status){
    this.loadingAction = true
    let newStatus = new FormData()
    newStatus.append('status',status)
    this._myContentService.changeStatus(this.selectedContent.id, newStatus)
      .subscribe(
        res => {
          this.selectedContent.status = res
          this.loadingAction = false
          this.triggerFalseClick(status)
        }
      )
  }

  delete(id) {
    this.loadingAction = true
    this._myContentService.delete(id)
      .subscribe(
        res => {
          this.loadingAction = false
          this.removeFromList()
          this.triggerFalseClick('delete')
        },
        error => {
          this.loadingAction = false
        }
      )
  }

  triggerFalseClick(action) {
    let el: HTMLElement
    switch (action) {
      case 'delete':
        el = this.closeButtonDelete.nativeElement as HTMLElement
        break;
      case 'pending':
        el = this.closeButtonSend.nativeElement as HTMLElement
        break;
      case 'canceled':
          el = this.closeButtonCancel.nativeElement as HTMLElement
      default:
        break;
    }
    el.click();
  }
}
