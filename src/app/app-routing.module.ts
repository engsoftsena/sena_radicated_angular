import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExternalComponent } from './modules/external/external.component';
import { InternalComponent } from './modules/internal/internal.component';

import { LoginComponent } from './modules/external/login/login.component';
import { DashboardComponent } from './modules/internal/dashboard/dashboard.component';

import { CausalComponent } from './modules/internal/causal/causal.component';
import { DocumentComponent } from './modules/internal/document/document.component';
import { CommunicationComponent } from './modules/internal/communication/communication.component';
import { PatientComponent } from './modules/internal/patient/patient.component';
import { RequestComponent } from './modules/internal/request/request.component';
import { ResourceComponent } from './modules/internal/resource/resource.component';
import { SettledComponent } from './modules/internal/settled/settled.component';
import { StateComponent } from './modules/internal/state/state.component';
import { RoleComponent } from './modules/internal/role/role.component';
import { TraceabilityComponent } from './modules/internal/traceability/traceability.component';
import { UserComponent } from './modules/internal/user/user.component';

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
      { path: 'causal', component: CausalComponent, },
      { path: 'document', component: DocumentComponent, },
      { path: 'communication', component: CommunicationComponent, },
      { path: 'patient', component: PatientComponent, },
      { path: 'request', component: RequestComponent, },
      { path: 'resource', component: ResourceComponent, },
      { path: 'role', component: RoleComponent, },
      { path: 'settled', component: SettledComponent, },
      { path: 'state', component: StateComponent, },
      { path: 'traceability', component: TraceabilityComponent, },
      { path: 'user', component: UserComponent, },
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
