import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { EssentialsComponent } from './essentials/essentials.component';
import { DetailsComponent } from './details/details.component';
import { EventsComponent } from './events/events.component';
import { CommandComponent } from './command/command.component';


const routes: Routes = [{
  path: '', component: BaseComponent, children: [
    { path: '', component: EssentialsComponent },
    { path: 'details', component: DetailsComponent },
    { path: 'events', component: EventsComponent },
    { path: 'commands', component: CommandComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReplicaRoutingModule { }
