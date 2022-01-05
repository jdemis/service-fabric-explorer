import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsCommandComponent } from './ps-command.component';

describe('PsCommandComponent', () => {
  let component: PsCommandComponent;
  let fixture: ComponentFixture<PsCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
