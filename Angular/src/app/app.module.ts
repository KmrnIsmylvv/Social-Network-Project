import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import {RegisterComponent} from './register/register.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FeedComponent} from './feed/feed.component';
import {MessagesComponent} from './messages/messages.component';
import {SettingsComponent} from './settings/settings.component';
import {MyProfileComponent} from './my-profile/my-profile.component'
import {SharedModule} from "./_modules/shared.module";
import {TestErrorsComponent} from './errors/test-errors/test-errors.component';
import {ErrorInterceptor} from "./_interceptor/error.interceptor";
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {ServerErrorComponent} from './errors/server-error/server-error.component';
import {ExploreComponent} from "./explore/explore.component";
import {ExploreDetailComponent} from './explore-detail/explore-detail.component';
import {MemberCardsComponent} from './member-cards/member-cards.component';
import {JwtInterceptor} from "./_interceptor/jwt.interceptor";
import {SettingsPhotoComponent} from './settings-photo/settings-photo.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {LoadingInterceptor} from "./_interceptor/loading.interceptor";
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { LikeListsComponent } from './like-lists/like-lists.component';
import { MemberMessagesComponent } from './member-messages/member-messages.component';
import { ConversationComponent } from './conversation/conversation.component';


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
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ExploreDetailComponent,
    MemberCardsComponent,
    SettingsPhotoComponent,
    TextInputComponent,
    DateInputComponent,
    LikeListsComponent,
    MemberMessagesComponent,
    ConversationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
