import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HomeComponent } from './components/home/home.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { TermsComponent } from './components/terms/terms.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'hotel-au-benin', component: HomeComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'terms', component: TermsComponent },
    ]
  }
];
