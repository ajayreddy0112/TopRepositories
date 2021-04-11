import { GithubSearchComponent } from './components/github-search/github-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'githubSearch', component: GithubSearchComponent},
  { path: '', redirectTo: 'githubSearch', pathMatch: 'full' },
  { path: '**', redirectTo: 'githubSearch', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
