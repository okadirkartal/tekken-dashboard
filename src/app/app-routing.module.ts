import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdmin } from './app.admin';
import { PageNotFound } from './app.PageNotFound';
import { AppScoring } from './app.scoring';
import { AppStandings } from './app.standings';

const routes: Routes = [
  { path: 'Standings', component: AppStandings },
  { path: 'Scoring', component: AppScoring },
  { path: 'Admin', component: AppAdmin },
  { path: '', redirectTo: '/Standings', pathMatch: 'full' },
  { path: '**', component: PageNotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
