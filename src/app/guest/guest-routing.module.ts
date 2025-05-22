import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubscriptionResultComponent } from './subscription-result/subscription-result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'subscription-result/:id', component: SubscriptionResultComponent },
];




RouterModule.forChild(routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule {}
