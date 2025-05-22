import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GuestRoutingModule } from './guest-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SubscriptionResultComponent } from './subscription-result/subscription-result.component';



@NgModule({
  declarations: [
    HomeComponent,
    SubscriptionResultComponent,
  
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class GuestModule { }
