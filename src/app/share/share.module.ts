import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintComponent } from '../pages/sprint/sprint.component';
import { TimerComponent } from '../pages/sprint/timer/timer.component';
import { TeamComponent } from '../components/team/team.component';
import { AuthorizationBtnComponent } from '../components/header/header-components/authorization-btn/authorization-btn.component';
import { CapabilitiesComponent } from '../components/capabilities/capabilities.component';
import { HeaderComponent } from '../components/header/header.component';
import { LogoComponent } from '../components/header/header-components/logo/logo.component';
import { NavigationComponent } from '../components/header/header-components/navigation/navigation.component';
import { MainComponent } from '../pages/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { LevelComponent } from '../pages/sprint/level/level.component';


@NgModule({
  declarations: [
    TimerComponent,
    SprintComponent,
    HeaderComponent,
    NavigationComponent,
    LogoComponent,
    AuthorizationBtnComponent,
    MainComponent,
    CapabilitiesComponent,
    TeamComponent,
    LevelComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    TimerComponent,
    SprintComponent,
    HeaderComponent,
    NavigationComponent,
    LogoComponent,
    AuthorizationBtnComponent,
    MainComponent,
    CapabilitiesComponent,
    TeamComponent,
    HttpClientModule,
    LevelComponent
  ]
})
export class ShareModule { }
