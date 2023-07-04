import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ExtDoctypeComponent } from './structure/external/initial/ext-doctype/ext-doctype.component';
import { ExtHeaderComponent } from './structure/external/initial/ext-header/ext-header.component';
import { ExtFooterComponent } from './structure/external/terminal/ext-footer/ext-footer.component';
import { ExtScriptsComponent } from './structure/external/terminal/ext-scripts/ext-scripts.component';

import { LoginComponent } from './modules/external/login/login.component';

import { IntDoctypeComponent } from './structure/internal/initial/int-doctype/int-doctype.component';

import { UserDataComponent } from './modules/internal/user-data/user-data.component';
import { DashboardComponent } from './modules/internal/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,

    ExtDoctypeComponent,
    ExtHeaderComponent,
    ExtFooterComponent,
    ExtScriptsComponent,

    LoginComponent,

    IntDoctypeComponent,

    UserDataComponent,
    DashboardComponent,
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
