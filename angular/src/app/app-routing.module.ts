import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SurveyComponent } from './pages/survey/survey.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: { title: 'Welcome to Group 3\'s Term Project'} },
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'register', component: RegistrationComponent, data: { title: 'Registration'}},
  { path: 'survey', component: SurveyComponent, data: { title: 'Surveys' } },
  { path: 'dashboard', component: DashboardComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
