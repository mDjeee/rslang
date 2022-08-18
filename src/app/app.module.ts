import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookComponent } from './pages/book/book.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { AudiocallComponent } from './pages/audiocall/audiocall.component';
import { HeaderComponent } from './pages/header/header.component';
import { NavigationComponent } from './pages/header/header-components/navigation/navigation.component';
import { LogoComponent } from './pages/header/header-components/logo/logo.component';
import { AuthorizationBtnComponent } from './pages/header/header-components/authorization-btn/authorization-btn.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // { path: '', component: AppComponent },
  { path: 'textbook', component: BookComponent },
  { path: 'gams/audiocall', component: AudiocallComponent },
  { path: 'games/sprint', component: SprintComponent },
  // { path: 'authorization', component: NotFoundPage },
  // { path: '**', component: NotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    SprintComponent,
    AudiocallComponent,
    HeaderComponent,
    NavigationComponent,
    LogoComponent,
    AuthorizationBtnComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
