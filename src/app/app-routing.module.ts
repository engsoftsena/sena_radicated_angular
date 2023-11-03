import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExternalComponent } from './modules/external/external.component';
import { InternalComponent } from './modules/internal/internal.component';

import { LoginComponent } from './modules/external/login/login.component';
import { DashboardComponent } from './modules/internal/dashboard/dashboard.component';

import { CausalComponent } from './modules/internal/application/ap-causal/causal.component';
import { DocumentComponent } from './modules/internal/technology/tg-document/document.component';
import { CommunicationComponent } from './modules/internal/application/ap-communication/communication.component';
import { PatientComponent } from './modules/internal/application/ap-patient/patient.component';
import { RequestComponent } from './modules/internal/application/ap-request/request.component';
import { ResourceComponent } from './modules/internal/application/ap-resource/resource.component';
import { SettledComponent } from './modules/internal/application/ap-settled/settled.component';
import { StateComponent } from './modules/internal/application/ap-state/state.component';
import { RoleComponent } from './modules/internal/technology/tg-role/role.component';
import { TraceabilityComponent } from './modules/internal/application/ap-traceability/traceability.component';
import { UserComponent } from './modules/internal/technology/tg-user/user.component';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
