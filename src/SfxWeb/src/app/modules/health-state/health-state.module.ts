import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthViewerComponent } from './health-viewer/health-viewer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailListTemplatesModule } from '../detail-list-templates/detail-list-templates.module';
import { MessageTemplaterComponent } from './message-templater/message-templater.component';
import { ChartsModule } from '../charts/charts.module';



@NgModule({
  declarations: [HealthViewerComponent, MessageTemplaterComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbTooltipModule,
    DetailListTemplatesModule,
    NgbNavModule,
    ChartsModule
  ],
  exports: [HealthViewerComponent, MessageTemplaterComponent]
})
export class HealthStateModule { }
