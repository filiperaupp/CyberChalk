import { Component, OnInit } from '@angular/core';
import { UserSolicitationService } from '../user-solicitation/user-solicitation.service';
import { UserSolicitation } from 'src/app/models/userSolicitation';
import { FilterNamePipe } from 'src/app/pipes/filter-name.pipe';

@Component({
  selector: 'app-all-solicitations',
  templateUrl: './all-solicitations.component.html',
  styleUrls: ['./all-solicitations.component.css']
})
export class AllSolicitationsComponent implements OnInit {

  private solicitations: UserSolicitation[]
  private loading: boolean = true;
  private isNull: boolean = false;
  private pipeName: FilterNamePipe

  constructor(private _userSolicitationService: UserSolicitationService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    this._userSolicitationService.getAll()
      .subscribe(
        (data:UserSolicitation[]) => {
          this.solicitations = data
          this.loading = false
        },
        error => {
          console.log(error)
        }
      )
  }

}
