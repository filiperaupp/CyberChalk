import { FormBuilder, Validators } from '@angular/forms';
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
  selectedShowContent: any

  loading: boolean = true
  loadingAction: boolean = false
  loadingShow: boolean = true

  filterStatus: FilterStatusPipe
  status = 'pending'

  formMensage = this.fb.group({
    recycleMensage: ['', Validators.required]
  })

  constructor(private _myContentsService: MyContentsService,
              private fb: FormBuilder) { }

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

  showContent(content){
    this.loadingShow = true
    this._myContentsService.getById(content.id)
      .subscribe(
        data => {
          this.selectedShowContent = data
          this.loadingShow = false
        }
      )

  }


  changeStatus(status){
    this.loadingAction = true
    let newStatus = new FormData();
    newStatus.append('status',status)
    if (status == 'recycled') {
      let mensage = this.formMensage.controls['recycleMensage'].value
      newStatus.append('recycleMensage', mensage)
    }
    this._myContentsService.changeStatus(this.selectedContent.id,newStatus)
      .subscribe(
        (res) => {
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