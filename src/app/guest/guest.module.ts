import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule
  ]
})
export class GuestModule {}