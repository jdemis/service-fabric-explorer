import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodeRoutingModule } from './node-routing.module';
import { BaseComponent } from './base/base.component';
import { EssentialsComponent } from './essentials/essentials.component';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailListTemplatesModule } from 'src/app/modules/detail-list-templates/detail-list-templates.module';
import { EventsComponent } from './events/events.component';
import { EventStoreModule } from 'src/app/modules/event-store/event-store.module';
import { UpgradeProgressModule } from 'src/app/modules/upgrade-progress/upgrade-progress.module';
import { NodeDeactivationModule } from 'src/app/modules/node-deactivation/node-deactivation.module';
import { ChartsModule } from 'src/app/modules/charts/charts.module';
import { ClusterModule } from '../cluster/cluster.module';
import { HealthStateModule } from 'src/app/modules/health-state/health-state.module';
import { CommandsComponent } from './commands/commands.component';
import { PsCommandsModule } from 'src/app/modules/ps-commands/ps-commands.module';

@NgModule({
  declarations: [BaseComponent, EssentialsComponent, DetailsComponent, EventsComponent, CommandsComponent],
  imports: [
    CommonModule,
    NodeRoutingModule,
    SharedModule,
    DetailListTemplatesModule,
    EventStoreModule,
    UpgradeProgressModule,
    NodeDeactivationModule,
    ChartsModule,
    ClusterModule,
    HealthStateModule,
    PsCommandsModule
  ]
})
export class NodeModule { }
