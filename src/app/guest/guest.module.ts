import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { GuestRoutingModule } from './guest-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
  
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class GuestModule { }
