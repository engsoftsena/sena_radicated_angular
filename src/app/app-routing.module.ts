import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExternalComponent } from './modules/external/external.component';
import { InternalComponent } from './modules/internal/internal.component';

import { LoginComponent } from './modules/external/login/login.component';
import { DashboardComponent } from './modules/internal/dashboard/dashboard.component';

/* Componentes: Modulos: Internos: Application */
import { ApCausalComponent } from './modules/internal/application/ap-causal/ap-causal.component';
import { ApCommunicationComponent } from './modules/internal/application/ap-communication/ap-communication.component';
import { ApPatientComponent } from './modules/internal/application/ap-patient/ap-patient.component';
import { ApRequestComponent } from './modules/internal/application/ap-request/ap-request.component';
import { ApResourceComponent } from './modules/internal/application/ap-resource/ap-resource.component';
import { ApSettledComponent } from './modules/internal/application/ap-settled/ap-settled.component';
import { ApStateComponent } from './modules/internal/application/ap-state/ap-state.component';
import { ApTraceabilityComponent } from './modules/internal/application/ap-traceability/ap-traceability.component';
/* Componentes: Modulos: Internos: Email */
import { EmHostingComponent } from './modules/internal/email/em-hosting/em-hosting.component';
import { EmSecurityComponent } from './modules/internal/email/em-security/em-security.component';
import { EmSettingComponent } from './modules/internal/email/em-setting/em-setting.component';
/* Componentes: Modulos: Internos: System */
import { SyAttributeComponent } from './modules/internal/system/sy-attribute/sy-attribute.component';
import { SyEliminateComponent } from './modules/internal/system/sy-eliminate/sy-eliminate.component';
import { SyModuleComponent } from './modules/internal/system/sy-module/sy-module.component';
import { SyPrefixComponent } from './modules/internal/system/sy-prefix/sy-prefix.component';
import { SyRelationComponent } from './modules/internal/system/sy-relation/sy-relation.component';
import { SySelectComponent } from './modules/internal/system/sy-select/sy-select.component';
/* Componentes: Modulos: Internos: Technology */
import { TgActionComponent } from './modules/internal/technology/tg-action/tg-action.component';
import { TgAuthorizationComponent } from './modules/internal/technology/tg-authorization/tg-authorization.component';
import { TgDocumentComponent } from './modules/internal/technology/tg-document/tg-document.component';
import { TgPermitComponent } from './modules/internal/technology/tg-permit/tg-permit.component';
import { TgRoleComponent } from './modules/internal/technology/tg-role/tg-role.component';
import { TgUserComponent } from './modules/internal/technology/tg-user/tg-user.component';
/* Componentes: Modulos: Internos: User */
import { UsPasswordComponent } from './modules/internal/user/us-password/us-password.component';
import { UsProccessComponent } from './modules/internal/user/us-proccess/us-proccess.component';

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
      {
        path: 'application',
        children: [
          { path: 'causal', component: ApCausalComponent, },
          { path: 'communication', component: ApCommunicationComponent, },
          { path: 'patient', component: ApPatientComponent, },
          { path: 'request', component: ApRequestComponent, },
          { path: 'resource', component: ApResourceComponent, },
          { path: 'settled', component: ApSettledComponent, },
          { path: 'state', component: ApStateComponent, },
          { path: 'traceability', component: ApTraceabilityComponent, },
        ],
      },
      
      {
        path: 'email',
        children: [
          { path: 'hosting', component: EmHostingComponent, },
          { path: 'security', component: EmSecurityComponent, },
          { path: 'setting', component: EmSettingComponent, },
        ],
      },
      
      {
        path: 'system',
        children: [
          { path: 'attribute', component: SyAttributeComponent, },
          { path: 'eliminate', component: SyEliminateComponent, },
          { path: 'module', component: SyModuleComponent, },
          { path: 'prefix', component: SyPrefixComponent, },
          { path: 'relation', component: SyRelationComponent, },
          { path: 'select', component: SySelectComponent, },
        ],
      },
      
      {
        path: 'technology',
        children: [
          { path: 'action', component: TgActionComponent, },
          { path: 'authorization', component: TgAuthorizationComponent, },
          { path: 'document', component: TgDocumentComponent, },
          { path: 'permit', component: TgPermitComponent, },
          { path: 'role', component: TgRoleComponent, },
          { path: 'user', component: TgUserComponent, },
        ],
      },
      
      {
        path: 'user',
        children: [
          { path: 'password', component: UsPasswordComponent, },
          { path: 'proccess', component: UsProccessComponent, },
        ],
      },

      { path: '', redirectTo: 'internal/dashboard', pathMatch: 'full', },
    ],
  },
  { path: '**', redirectTo: 'external/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
