import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintComponent } from '../pages/sprint/sprint.component';
import { TimerComponent } from '../pages/sprint/timer/timer.component';
import { TeamComponent } from '../components/team/team.component';
import { AuthorizationBtnComponent } from '../components/header/header-components/authorization-btn/authorization-btn.component';
import { CapabilitiesComponent } from '../components/capabilities/capabilities.component';
import { HeaderComponent } from '../components/header/header.component';
import { NavigationComponent } from '../components/header/header-components/navigation/navigation.component';
import { MainComponent } from '../pages/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import {BookComponent} from "../pages/book/book.component";
import {AppLogoComponent} from "../components/appLogo/appLogo.component";
import {RssLogoComponent} from "../components/rss-logo/rss-logo.component";
import {FooterComponent} from "../components/footer/footer.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AppRoutingModule} from "../app-routing.module";
import { AuthComponent } from '../pages/auth/auth.component';
import { FormsModule }   from '@angular/forms';
import { LevelSelectionComponent } from '../components/level-selection/level-selection.component';
import { LevelComponent } from '../pages/sprint/level/level.component';
import { AudiocallComponent } from '../pages/audiocall/audiocall.component';
import { GameTitleComponent } from '../components/game-title/game-title.component';



@NgModule({
  declarations: [
    TimerComponent,
    SprintComponent,
    HeaderComponent,
    NavigationComponent,
    AuthorizationBtnComponent,
    MainComponent,
    CapabilitiesComponent,
    TeamComponent,
    BookComponent,
    AppLogoComponent,
    RssLogoComponent,
    FooterComponent,
    AuthComponent,,
    LevelSelectionComponent,
    LevelComponent,
    AudiocallComponent,
    GameTitleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    AppRoutingModule,

  ],
  exports: [
    TimerComponent,
    SprintComponent,
    HeaderComponent,
    NavigationComponent,
    AuthorizationBtnComponent,
    AuthComponent,
    MainComponent,
    CapabilitiesComponent,
    TeamComponent,
    HttpClientModule,
    BookComponent,
    AppLogoComponent,
    RssLogoComponent,
    FooterComponent,
    BrowserAnimationsModule,
    MatPaginatorModule,
    LevelSelectionComponent,
    LevelComponent,
    AudiocallComponent,
    GameTitleComponent
  ]
})
export class ShareModule { }
