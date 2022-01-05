import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsCommandComponent } from './ps-command/ps-command.component';
import { PsCommandViewerComponent } from './ps-command-viewer/ps-command-viewer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PsCommandComponent,
    PsCommandViewerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PsCommandComponent,
    PsCommandViewerComponent
  ]
})
export class PsCommandsModule { }
