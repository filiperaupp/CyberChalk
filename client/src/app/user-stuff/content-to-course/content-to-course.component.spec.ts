import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentToCourseComponent } from './content-to-course.component';

describe('ContentToCourseComponent', () => {
  let component: ContentToCourseComponent;
  let fixture: ComponentFixture<ContentToCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentToCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
