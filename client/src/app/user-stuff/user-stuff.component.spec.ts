import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStuffComponent } from './user-stuff.component';

describe('UserStuffComponent', () => {
  let component: UserStuffComponent;
  let fixture: ComponentFixture<UserStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
