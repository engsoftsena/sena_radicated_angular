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

/* Componentes: Modulos: Internos */
import { CausalComponent } from './modules/internal/causal/causal.component';
import { DocumentComponent } from './modules/internal/document/document.component';
import { ComunicationComponent } from './modules/internal/comunication/comunication.component';
import { PatientComponent } from './modules/internal/patient/patient.component';
import { RequestComponent } from './modules/internal/request/request.component';
import { ResourceComponent } from './modules/internal/resource/resource.component';
import { SettledComponent } from './modules/internal/settled/settled.component';
import { StateComponent } from './modules/internal/state/state.component';
import { RoleComponent } from './modules/internal/role/role.component';
import { TraceabilityComponent } from './modules/internal/traceability/traceability.component';
import { UserComponent } from './modules/internal/user/user.component';

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
    /* Componentes: Modulos: Externos */
    ExternalComponent,
    LoginComponent,
    /* Componentes: Modulos: Internos */
    InternalComponent,
    DashboardComponent,
    /* Componentes: Modulos: Internos */
    CausalComponent,
    DocumentComponent,
    ComunicationComponent,
    PatientComponent,
    RequestComponent,
    ResourceComponent,
    SettledComponent,
    StateComponent,
    RoleComponent,
    TraceabilityComponent,
    UserComponent,
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
