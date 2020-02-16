import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateNewLetterComponent } from './components/create-new-letter/create-new-letter.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-letter'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-letter', component: CreateNewLetterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
