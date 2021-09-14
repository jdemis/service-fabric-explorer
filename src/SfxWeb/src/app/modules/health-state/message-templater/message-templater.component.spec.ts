import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTemplaterComponent } from './message-templater.component';

describe('MessageTemplaterComponent', () => {
  let component: MessageTemplaterComponent;
  let fixture: ComponentFixture<MessageTemplaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageTemplaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTemplaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
