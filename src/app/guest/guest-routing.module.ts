import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubscriptionResultComponent } from './subscription-result/subscription-result.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'subscription-result/fail', component: SubscriptionResultComponent }, 
  { path: 'subscription-result/:productId', component: SubscriptionResultComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule {}
