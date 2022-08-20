import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookComponent } from './pages/book/book.component';
import { SprintComponent } from './pages/sprint/sprint.component';
import { AudiocallComponent } from './pages/audiocall/audiocall.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/header/header-components/navigation/navigation.component';
import { LogoComponent } from './components/header/header-components/logo/logo.component';
import { AuthorizationBtnComponent } from './components/header/header-components/authorization-btn/authorization-btn.component';
import { AppRoutingModule } from './app-routing.module';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
