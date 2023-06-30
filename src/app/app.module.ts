import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DoctypeComponent } from './structure/external/initial/doctype/doctype.component';
import { HeaderComponent } from './structure/external/initial/header/header.component';
import { FooterComponent } from './structure/external/terminal/footer/footer.component';
import { ScriptsComponent } from './structure/external/terminal/scripts/scripts.component';

import { LoginComponent } from './modules/external/login/login.component';
import { UserDataComponent } from './modules/internal/user-data/user-data.component';

@NgModule({
  declarations: [
    AppComponent,

    DoctypeComponent,
    HeaderComponent,
    FooterComponent,
    ScriptsComponent,

    LoginComponent,

    UserDataComponent,
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
