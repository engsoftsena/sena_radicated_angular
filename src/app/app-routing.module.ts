import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExternalComponent } from './modules/external/external.component';
import { InternalComponent } from './modules/internal/internal.component';

import { LoginComponent } from './modules/external/login/login.component';
import { DashboardComponent } from './modules/internal/dashboard/dashboard.component';
import { TgRoleDataComponent } from './modules/internal/technology/tg-role-data/tg-role-data.component';
import { TgUserDataComponent } from './modules/internal/technology/tg-user-data/tg-user-data.component';

/*const routes: Routes = [
  {
    path: '',
    component: InternalComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'tgroledata', component: TgRoleDataComponent, },
      { path: 'tguserdata', component: TgUserDataComponent, },
      //{ path: '', redirectTo: '/dashboard', pathMatch: 'full', },
    ]
  },
  { path: 'login', component: LoginComponent, },
];*/

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'external/login' },
  {
    path: 'external',
    component: ExternalComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'internal',
    component: InternalComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'tgroledata', component: TgRoleDataComponent, },
      { path: 'tguserdata', component: TgUserDataComponent, },
      { path: '', redirectTo: 'internal/dashboard', pathMatch: 'full', },
    ]
  },
  { path: '**', redirectTo: 'external/login' },
];

/*const routes: Routes = [
  {
    path: '',
    component: InternalComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'tgroledata', component: TgRoleDataComponent, },
      { path: 'tguserdata', component: TgUserDataComponent, },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full', },
    ]
  },
  { path: 'login', component: LoginComponent, },
];*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
