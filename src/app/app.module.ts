import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Componentes: Externos e Internos */
import { InternalComponent } from './modules/internal/internal.component';
import { ExternalComponent } from './modules/external/external.component';

/* Componentes: Externos Iniciales */
import { ExtDoctypeComponent } from './structure/external/initial/ext-doctype/ext-doctype.component';
import { ExtHeaderComponent } from './structure/external/initial/ext-header/ext-header.component';

/* Componentes: Externos Terminales */
import { ExtFooterComponent } from './structure/external/terminal/ext-footer/ext-footer.component';
import { ExtScriptsComponent } from './structure/external/terminal/ext-scripts/ext-scripts.component';

/* Componentes: Internos Iniciales */
import { IntDoctypeComponent } from './structure/internal/initial/int-doctype/int-doctype.component';
import { IntOptionComponent } from './structure/internal/initial/int-option/int-option.component';
import { IntSidebarComponent } from './structure/internal/initial/int-sidebar/int-sidebar.component';
import { IntHeaderComponent } from './structure/internal/initial/int-header/int-header.component';

/* Componentes: Internos Terminales */
import { IntFooterComponent } from './structure/internal/terminal/int-footer/int-footer.component';
import { IntTransparentComponent } from './structure/internal/terminal/int-transparent/int-transparent.component';
import { IntColorComponent } from './structure/internal/terminal/int-color/int-color.component';
import { IntModalComponent } from './structure/internal/terminal/int-modal/int-modal.component';
import { IntScriptComponent } from './structure/internal/terminal/int-script/int-script.component';
import { IntProfileComponent } from './structure/internal/terminal/int-modal/int-profile/int-profile.component';
import { IntLogoutComponent } from './structure/internal/terminal/int-modal/int-logout/int-logout.component';
import { IntSettingComponent } from './structure/internal/terminal/int-modal/int-setting/int-setting.component';

/* Componentes: Modulos Externos */
import { LoginComponent } from './modules/external/login/login.component';

/* Componentes: Modulos Internos */
import { DashboardComponent } from './modules/internal/dashboard/dashboard.component';
import { TgRoleDataComponent } from './modules/internal/tg-role-data/tg-role-data.component';
import { TgUserDataComponent } from './modules/internal/tg-user-data/tg-user-data.component';

@NgModule({
  declarations: [
    AppComponent,

    InternalComponent,
    ExternalComponent,

    ExtDoctypeComponent,
    ExtHeaderComponent,

    ExtFooterComponent,
    ExtScriptsComponent,

    IntDoctypeComponent,
    IntOptionComponent,
    IntSidebarComponent,
    IntHeaderComponent,

    IntFooterComponent,
    IntTransparentComponent,
    IntColorComponent,
    IntModalComponent,
    IntScriptComponent,
    IntProfileComponent,
    IntLogoutComponent,
    IntSettingComponent,

    LoginComponent,

    DashboardComponent,
    TgRoleDataComponent,
    TgUserDataComponent,
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
