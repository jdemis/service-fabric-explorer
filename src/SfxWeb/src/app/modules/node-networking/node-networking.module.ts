import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { DependencyWheelComponent } from './dependency-wheel/dependency-wheel.component';
import { NodeGraphComponent } from './node-graph/node-graph.component';



@NgModule({
  declarations: [HeatmapComponent, DependencyWheelComponent, NodeGraphComponent],
  imports: [
    CommonModule
  ],
  exports: [HeatmapComponent, DependencyWheelComponent, NodeGraphComponent]
})
export class NodeNetworkingModule { }
