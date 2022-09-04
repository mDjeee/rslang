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
import {LevelComponent} from "../pages/sprint/level/level.component";
import { AuthComponent } from '../pages/auth/auth.component';
import { FormsModule }   from '@angular/forms';
import { LevelSelectionComponent } from '../components/level-selection/level-selection.component';
import { AudiocallComponent } from '../pages/audiocall/audiocall.component';
import { GameTitleComponent } from '../components/game-title/game-title.component';
import { GameAudiocallComponent } from '../pages/audiocall/game-audiocall/game-audiocall.component';
import { GameResultComponent } from '../components/game-result/game-result.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { WordsTableComponent } from '../components/words-table/words-table.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { SprintBorderDirective } from './directives/sprint-border.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ChartComponent} from "../pages/sprint/chart/chart.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { StatisticsComponent } from '../pages/statistics/statistics.component';
import { GameCardComponent } from '../components/game-card/game-card.component';
import { BarChartComponent } from '../components/bar-chart/bar-chart.component';
import { LinearChartComponent } from '../components/linear-chart/linear-chart.component';




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
    AuthComponent,
    LevelSelectionComponent,
    LevelComponent,
    AudiocallComponent,
    GameTitleComponent,
    GameAudiocallComponent,
    GameResultComponent,
    DoughnutChartComponent,
    WordsTableComponent,
    NotFoundComponent,
    StatisticsComponent,
    GameCardComponent,
    BarChartComponent,
    LinearChartComponent,
    SprintBorderDirective,
    ChartComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
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
    MatProgressSpinnerModule,
    LevelSelectionComponent,
    LevelComponent,
    AudiocallComponent,
    GameTitleComponent,
    GameAudiocallComponent,
    GameResultComponent,
    NotFoundComponent,
    StatisticsComponent,
    GameCardComponent,
    BarChartComponent,
    LinearChartComponent,
    SprintBorderDirective,
    MatProgressSpinnerModule,
    ChartComponent,
  ]
})
export class ShareModule { }
