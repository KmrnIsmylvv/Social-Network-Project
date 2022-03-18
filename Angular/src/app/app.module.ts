import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import {RegisterComponent} from './register/register.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ExploreComponent} from './explore/explore.component';
import {FeedComponent} from './feed/feed.component';
import {MessagesComponent} from './messages/messages.component';
import {SettingsComponent} from './settings/settings.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {ExploreDetailComponent} from './explore/explore-detail/explore-detail.component';
import {ToastrModule} from "ngx-toastr";
import {SharedModule} from "./_modules/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    ExploreComponent,
    FeedComponent,
    MessagesComponent,
    SettingsComponent,
    MyProfileComponent,
    ExploreDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
