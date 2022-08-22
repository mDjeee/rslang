import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppLogoComponent } from './components/appLogo/appLogo.component';
import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from './share/share.module';
import { CoreModule } from './core/core.module';
import { MainComponent } from './pages/main/main.component';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';
import { TeamComponent } from './components/team/team.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BookComponent } from './pages/book/book.component';
import { RssLogoComponent } from './components/rss-logo/rss-logo.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    AppLogoComponent,
    MainComponent,
    CapabilitiesComponent,
    TeamComponent,
    RssLogoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModule,
    CoreModule
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  exports: [AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
