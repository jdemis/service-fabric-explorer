import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { DependencyWheelComponent } from './dependency-wheel/dependency-wheel.component';



@NgModule({
  declarations: [HeatmapComponent, DependencyWheelComponent],
  imports: [
    CommonModule
  ],
  exports: [HeatmapComponent, DependencyWheelComponent]
})
export class NodeNetworkingModule { }
