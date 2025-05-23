import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component.js';
import { LogoComponent } from './icons/logo/logo.component.js';
import { MainButtonComponent } from './buttons/main-button/main-button.component';
import { FooterComponent } from './footer/footer.component';
import { TestComponent } from './test/test.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GymGoalLabelPipe } from './pipes/gym-goal-label.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    MainButtonComponent,
    FooterComponent,
    TestComponent,
    GymGoalLabelPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [HeaderComponent,MainButtonComponent, FooterComponent,GymGoalLabelPipe,] 
})
export class SharedModule { }
