import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FeedComponent} from "./feed/feed.component";
import {MessagesComponent} from "./messages/messages.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {SettingsComponent} from "./settings/settings.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {AuthGuard} from "./_guards/auth.guard";
import {NavbarComponent} from "./navbar/navbar.component";
import {TestErrorsComponent} from "./errors/test-errors/test-errors.component";
import {NotFoundComponent} from "./errors/not-found/not-found.component";
import {ServerErrorComponent} from "./errors/server-error/server-error.component";
import {ExploreComponent} from "./explore/explore.component";
import {ExploreDetailComponent} from "./explore-detail/explore-detail.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'explore', component: ExploreComponent},
      {path: 'explore/:username', component: ExploreDetailComponent},
      {path: 'feed', component: FeedComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'my-profile', component: MyProfileComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'sidebar', component: SidebarComponent},
      {path: 'navbar', component: NavbarComponent},
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: FeedComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
