import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Componentes: Estructuras: Internos: Principales */
import { IntInitialComponent } from './structures/internal/int-initial/int-initial.component';
import { IntTerminalComponent } from './structures/internal/int-terminal/int-terminal.component';
/* Componentes: Estructuras: Internos: Inicial */
import { IntHeaderComponent } from './structures/internal/int-initial/int-header/int-header.component';
import { IntSidebarComponent } from './structures/internal/int-initial/int-sidebar/int-sidebar.component';
import { IntOptionComponent } from './structures/internal/int-initial/int-option/int-option.component';
/* Componentes: Estructuras: Internos: Terminal */
import { IntColorComponent } from './structures/internal/int-terminal/int-color/int-color.component';
import { IntFooterComponent } from './structures/internal/int-terminal/int-footer/int-footer.component';
import { IntModalComponent } from './structures/internal/int-terminal/int-modal/int-modal.component';
/* Componentes: Estructuras: Internos: Modales */
import { IntLogoutComponent } from './structures/internal/int-terminal/int-modal/int-logout/int-logout.component';
import { IntModuleComponent } from './structures/internal/int-terminal/int-modal/int-module/int-module.component';
import { IntProfileComponent } from './structures/internal/int-terminal/int-modal/int-profile/int-profile.component';
import { IntSettingComponent } from './structures/internal/int-terminal/int-modal/int-setting/int-setting.component';

/* Componentes: Modulos: Externos */
import { ExternalComponent } from './modules/external/external.component';
import { LoginComponent } from './modules/external/login/login.component';

/* Componentes: Modulos: Internos */
import { InternalComponent } from './modules/internal/internal.component';
import { DashboardComponent } from './modules/internal/dashboard/dashboard.component';
import { GenErrorComponent } from './modules/general/gen-error/gen-error.component';

/* Componentes: Modulos: Internos: System */
import { SyAttributeComponent } from './modules/internal/system/sy-attribute/sy-attribute.component';
import { SyEliminateComponent } from './modules/internal/system/sy-eliminate/sy-eliminate.component';
import { SyModuleComponent } from './modules/internal/system/sy-module/sy-module.component';
import { SyPrefixComponent } from './modules/internal/system/sy-prefix/sy-prefix.component';
import { SyRelationComponent } from './modules/internal/system/sy-relation/sy-relation.component';
import { SySelectComponent } from './modules/internal/system/sy-select/sy-select.component';
/* Componentes: Modulos: Internos: User */
import { UsPasswordComponent } from './modules/internal/user/us-password/us-password.component';
import { UsProccessComponent } from './modules/internal/user/us-proccess/us-proccess.component';
/* Componentes: Modulos: Internos: Email */
import { EmHostingComponent } from './modules/internal/email/em-hosting/em-hosting.component';
import { EmSecurityComponent } from './modules/internal/email/em-security/em-security.component';
import { EmSettingComponent } from './modules/internal/email/em-setting/em-setting.component';
/* Componentes: Modulos: Internos: Technology */
import { TgActionComponent } from './modules/internal/technology/tg-action/tg-action.component';
import { TgAuthorizationComponent } from './modules/internal/technology/tg-authorization/tg-authorization.component';
import { ApDocumentComponent } from './modules/internal/technology/tg-document/tg-document.component';
import { TgPermitComponent } from './modules/internal/technology/tg-permit/tg-permit.component';
import { ApRoleComponent } from './modules/internal/technology/tg-role/tg-role.component';
import { ApUserComponent } from './modules/internal/technology/tg-user/tg-user.component';
/* Componentes: Modulos: Internos: Application */
import { ApCausalComponent } from './modules/internal/application/ap-causal/ap-causal.component';
import { ApCommunicationComponent } from './modules/internal/application/ap-communication/ap-communication.component';
import { ApPatientComponent } from './modules/internal/application/ap-patient/ap-patient.component';
import { ApRequestComponent } from './modules/internal/application/ap-request/ap-request.component';
import { ApResourceComponent } from './modules/internal/application/ap-resource/ap-resource.component';
import { ApSettledComponent } from './modules/internal/application/ap-settled/ap-settled.component';
import { ApStateComponent } from './modules/internal/application/ap-state/ap-state.component';
import { ApTraceabilityComponent } from './modules/internal/application/ap-traceability/ap-traceability.component';

@NgModule({
  declarations: [
    AppComponent,
    /* Componentes: Estructuras: Internos: Principales */
    IntInitialComponent,
    IntTerminalComponent,
    /* Componentes: Estructuras: Internos: Inicial */
    IntHeaderComponent,
    IntOptionComponent,
    IntSidebarComponent,
    /* Componentes: Estructuras: Internos: Terminal */
    IntColorComponent,
    IntFooterComponent,
    IntModalComponent,
    /* Componentes: Estructuras: Internos: Modales */
    IntLogoutComponent,
    IntModuleComponent,
    IntProfileComponent,
    IntSettingComponent,
    /* Componentes: Modulos: Generales */
    GenErrorComponent,
    /* Componentes: Modulos: Externos */
    ExternalComponent,
    LoginComponent,
    /* Componentes: Modulos: Internos */
    InternalComponent,
    DashboardComponent,
    /* Componentes: Modulos: Internos */
    ApCausalComponent,
    ApDocumentComponent,
    ApCommunicationComponent,
    ApPatientComponent,
    ApRequestComponent,
    ApResourceComponent,
    ApSettledComponent,
    ApStateComponent,
    ApRoleComponent,
    ApTraceabilityComponent,
    ApUserComponent,
    TgActionComponent,
    TgAuthorizationComponent,
    TgPermitComponent,
    UsPasswordComponent,
    UsProccessComponent,
    SyAttributeComponent,
    SyEliminateComponent,
    SyModuleComponent,
    SyPrefixComponent,
    SyRelationComponent,
    SySelectComponent,
    EmHostingComponent,
    EmSecurityComponent,
    EmSettingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
