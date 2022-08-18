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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
