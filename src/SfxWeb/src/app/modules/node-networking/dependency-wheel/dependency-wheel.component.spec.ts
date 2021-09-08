import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyWheelComponent } from './dependency-wheel.component';

describe('DependencyWheelComponent', () => {
  let component: DependencyWheelComponent;
  let fixture: ComponentFixture<DependencyWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependencyWheelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
