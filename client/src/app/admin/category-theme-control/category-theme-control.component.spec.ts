import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryThemeControlComponent } from './category-theme-control.component';

describe('CategoryThemeControlComponent', () => {
  let component: CategoryThemeControlComponent;
  let fixture: ComponentFixture<CategoryThemeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryThemeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryThemeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
