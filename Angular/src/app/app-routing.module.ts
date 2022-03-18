import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ExploreComponent} from "./explore/explore.component";
import {ExploreDetailComponent} from "./explore/explore-detail/explore-detail.component";
import {FeedComponent} from "./feed/feed.component";
import {MessagesComponent} from "./messages/messages.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {SettingsComponent} from "./settings/settings.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {AuthGuard} from "./_guards/auth.guard";
import {NavbarComponent} from "./navbar/navbar.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'explore', component: ExploreComponent},
      {path: 'explore/:id', component: ExploreDetailComponent},
      {path: 'feed', component: FeedComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'my-profile', component: MyProfileComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'sidebar', component: SidebarComponent},
      {path: 'navbar', component: NavbarComponent},
    ]
  },

  {path: '**', component: FeedComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
