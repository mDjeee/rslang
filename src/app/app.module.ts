import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/header/header-components/navigation/navigation.component';
import { LogoComponent } from './components/header/header-components/logo/logo.component';
import { AuthorizationBtnComponent } from './components/header/header-components/authorization-btn/authorization-btn.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './pages/main/main.component';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';
import { TeamComponent } from './components/team/team.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BookComponent } from './pages/book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookComponent,
    NavigationComponent,
    LogoComponent,
    AuthorizationBtnComponent,
    MainComponent,
    CapabilitiesComponent,
    TeamComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  exports: [AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
