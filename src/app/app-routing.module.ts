import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { AudiocallComponent } from './pages/audiocall/audiocall.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { OasisComponent } from './pages/oasis/oasis.component';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './pages/auth/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { LevelComponent } from "./pages/sprint/level/level.component";

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'textbook', component: BookComponent },
  { path: 'games/audiocall', component: AudiocallComponent, canActivate: [AuthGuard]},
  { path: 'games/sprint', component: SprintComponent, canActivate: [AuthGuard]  },
  { path: 'games/sprint/level/:id', component: LevelComponent},
  { path: 'games/oasis', component: OasisComponent, canActivate: [AuthGuard]},
  { path: 'authorization', component: AuthComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
