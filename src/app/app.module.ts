import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStandings } from './app.standings';
import { AppAdmin } from './app.admin';
import { AppScoring } from './app.scoring';
import { PageNotFound } from './app.PageNotFound';

@NgModule({
  declarations: [
    AppComponent,
    AppStandings,
    AppAdmin,
    AppScoring,
    PageNotFound,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
