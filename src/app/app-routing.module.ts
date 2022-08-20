import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { AudiocallComponent } from './pages/audiocall/audiocall.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { MainComponent } from './pages/main/main.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'textbook', component: BookComponent },
  { path: 'gams/audiocall', component: AudiocallComponent },
  { path: 'games/sprint', component: SprintComponent },
  // { path: 'authorization', component: NotFoundPage },
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