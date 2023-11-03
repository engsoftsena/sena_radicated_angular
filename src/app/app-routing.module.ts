import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExternalComponent } from './modules/external/external.component';
import { InternalComponent } from './modules/internal/internal.component';

import { LoginComponent } from './modules/external/login/login.component';
import { DashboardComponent } from './modules/internal/dashboard/dashboard.component';

import { ApCausalComponent } from './modules/internal/application/ap-causal/ap-causal.component';
import { ApDocumentComponent } from './modules/internal/technology/tg-document/tg-document.component';
import { ApCommunicationComponent } from './modules/internal/application/ap-communication/ap-communication.component';
import { ApPatientComponent } from './modules/internal/application/ap-patient/ap-patient.component';
import { ApRequestComponent } from './modules/internal/application/ap-request/ap-request.component';
import { ApResourceComponent } from './modules/internal/application/ap-resource/ap-resource.component';
import { ApSettledComponent } from './modules/internal/application/ap-settled/ap-settled.component';
import { ApStateComponent } from './modules/internal/application/ap-state/ap-state.component';
import { ApRoleComponent } from './modules/internal/technology/tg-role/tg-role.component';
import { ApTraceabilityComponent } from './modules/internal/application/ap-traceability/ap-traceability.component';
import { ApUserComponent } from './modules/internal/technology/tg-user/tg-user.component';

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
      { path: 'causal', component: ApCausalComponent, },
      { path: 'document', component: ApDocumentComponent, },
      { path: 'communication', component: ApCommunicationComponent, },
      { path: 'patient', component: ApPatientComponent, },
      { path: 'request', component: ApRequestComponent, },
      { path: 'resource', component: ApResourceComponent, },
      { path: 'role', component: ApRoleComponent, },
      { path: 'settled', component: ApSettledComponent, },
      { path: 'state', component: ApStateComponent, },
      { path: 'traceability', component: ApTraceabilityComponent, },
      { path: 'user', component: ApUserComponent, },
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
