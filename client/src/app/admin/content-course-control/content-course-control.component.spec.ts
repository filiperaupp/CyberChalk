import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCourseControlComponent } from './content-course-control.component';

describe('ContentCourseControlComponent', () => {
  let component: ContentCourseControlComponent;
  let fixture: ComponentFixture<ContentCourseControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCourseControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCourseControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
