import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { AudiocallComponent } from './pages/audiocall/audiocall.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './pages/auth/auth.guard';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'textbook', component: BookComponent },
  { path: 'games/audiocall', component: AudiocallComponent, canActivate: [AuthGuard] },
  { path: 'games/sprint', component: SprintComponent, canActivate: [AuthGuard]  },
  { path: 'authorization', component: AuthComponent },
  // { path: '**', component: NotFoundComponent },
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
