import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateNewLetterComponent } from './components/create-new-letter/create-new-letter.component';
import { ShowAllLettersComponent } from './components/show-all-letters/show-all-letters.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-letter'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'show-all-letters', component: ShowAllLettersComponent },
  { path: 'create-letter', component: CreateNewLetterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
