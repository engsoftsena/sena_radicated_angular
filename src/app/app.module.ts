import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './structure/inital/header/header.component';
import { SidebarComponent } from './structure/inital/sidebar/sidebar.component';
import { OptionComponent } from './structure/inital/option/option.component';

import { ColorComponent } from './structure/terminal/color/color.component';
import { FooterComponent } from './structure/terminal/footer/footer.component';
import { ModalComponent } from './structure/terminal/modal/modal.component';

import { LogoutComponent } from './structure/terminal/modal/logout/logout.component';
import { ModuleComponent } from './structure/terminal/modal/module/module.component';
import { ProfileComponent } from './structure/terminal/modal/profile/profile.component';
import { SettingComponent } from './structure/terminal/modal/setting/setting.component';

import { InitalComponent } from './structure/inital/inital.component';
import { TerminalComponent } from './structure/terminal/terminal.component';

/* Componentes: Modulos Externos */
import { ExternalComponent } from './modules/external/external.component';
import { LoginComponent } from './modules/external/login/login.component';

/* Componentes: Modulos Internos */
import { InternalComponent } from './modules/internal/internal.component';
import { DashboardComponent } from './modules/internal/dashboard/dashboard.component';
import { TgRoleDataComponent } from './modules/internal/technology/tg-role-data/tg-role-data.component';
import { TgUserDataComponent } from './modules/internal/technology/tg-user-data/tg-user-data.component';

@NgModule({
  declarations: [
    AppComponent,

    InitalComponent,
    TerminalComponent,

    HeaderComponent,
    OptionComponent,
    SidebarComponent,
    ModuleComponent,

    ColorComponent,
    FooterComponent,
    ModalComponent,
    LogoutComponent,
    ProfileComponent,
    SettingComponent,

    ExternalComponent,
    LoginComponent,

    InternalComponent,
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
