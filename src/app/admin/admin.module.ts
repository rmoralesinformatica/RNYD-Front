import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DietManagementComponent } from './admin/components/diet-management/diet-management.component';
import { WorkoutManagementComponent } from './components/workout-management/workout-management.component';

@NgModule({
  declarations: [AdminComponent, DietManagementComponent, WorkoutManagementComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {}
