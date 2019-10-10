import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './component/app/app.component';
import { LoginComponent } from './component/login/login.component';
import { HttpClient } from 'selenium-webdriver/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClient,
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: "full", data: {title: 'Login'} },

      { path: 'login', component: LoginComponent, data: {title: 'Login'} },
      
      { path: '**', redirectTo: 'login' }
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModuleShared { }
