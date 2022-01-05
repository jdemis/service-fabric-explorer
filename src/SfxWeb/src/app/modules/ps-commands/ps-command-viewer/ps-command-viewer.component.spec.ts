import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsCommandViewerComponent } from './ps-command-viewer.component';

describe('PsCommandViewerComponent', () => {
  let component: PsCommandViewerComponent;
  let fixture: ComponentFixture<PsCommandViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsCommandViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsCommandViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
