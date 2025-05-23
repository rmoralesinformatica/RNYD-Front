import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { AccountRoutingModule } from './account-routing.module';
import { UserProgressComponent } from './components/user-progress/user-progress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GymGoalLabelPipe } from '../shared/pipes/gym-goal-label.pipe';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AccountComponent,
    UserProgressComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    SharedModule ,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
