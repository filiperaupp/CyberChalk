import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CategoryService } from '../admin/category-theme-control/category/category.service';
import { Category } from '../models/category';
import { AuthService } from '../services/auth.service';
import { DashboardService } from './dashboard.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('navTitle') navTitle: ElementRef

  private categories: Category[]
  private toggled = true;
  private title1 = "Cyber";
  private title2 = "Chalk"
  private admin = true
  private user

  constructor(private _authService: AuthService,
              private _dashboardService: DashboardService,
              private _sharedService: SharedService) { }

  ngOnInit() {
    this.verifyAdmin()
    this.getAllCategories()
    this._sharedService.changeEmitted$
      .subscribe(
        text => this.getAllCategories()
      )
  }
  
  ngAfterViewInit(){
    this.setAccordion()
  }
  
  verifyAdmin(){
    this.admin = this._authService.verifyAdmin()
  }

  getAllCategories(){
    this. user = null
    this._dashboardService.getData()
      .subscribe(
        (responseList) => {
          this.categories = responseList[0] as Category[]
          this.user = responseList[1]
        },
        error => {
          console.log(error)
        }
      )
  }


  //page move
  toggleMenu() {
    if (!this.toggled) {
      document.getElementById("sideMenu").style.width = "230px";
      document.getElementById("sideMenu").style.display = "block";
      document.getElementById("board").style.width = "calc(100% - 230px)"
      if (window.innerWidth > 500) {
        document.getElementById("navTitle").style.width = "230px";
        this.title1 = "Cyber"
        this.title2 = "Chalk"
      }
    } else {
      document.getElementById("sideMenu").style.width = "0px";
      document.getElementById("board").style.marginLeft = "0px";
      document.getElementById("board").style.width = "100%"
      if (window.innerWidth > 500) {
        document.getElementById("navTitle").style.width = "50px";
        this.title1 = "C"
        this.title2 = "c"
      }
    }
    this.toggled = !this.toggled;
  }

  setAccordion(){
    let acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  urlImage(){
    return 'url(http://localhost:8000/storage/'+this.user.profile_photo+')'
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event){
  //   let divTitle = this.navTitle.nativeElement.offsetWidth 
  //   if (divTitle<=50) 
  //     this.title = "Cc"
  //   else 
  //     this.title = "CyberChalk"
  //   console.log(this.title)
  // }

}
