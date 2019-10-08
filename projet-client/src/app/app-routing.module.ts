import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetsComponent } from './projets/projets.component';
import { ValidComponent } from './valid/valid.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/projets',
    pathMatch: 'full'
  },
  {
    path: 'projets',
    component: ProjetsComponent
  },
  {
    path: 'valid',
    component: ValidComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
