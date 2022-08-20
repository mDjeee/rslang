import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/header/header-components/navigation/navigation.component';
import { LogoComponent } from './components/header/header-components/logo/logo.component';
import { AuthorizationBtnComponent } from './components/header/header-components/authorization-btn/authorization-btn.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './pages/main/main.component';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';
import { TeamComponent } from './components/team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    LogoComponent,
    AuthorizationBtnComponent,
    MainComponent,
    CapabilitiesComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
