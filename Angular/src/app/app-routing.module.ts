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
import {SettingsPhotoComponent} from "./settings-photo/settings-photo.component";
import {PreventUnsavedChangesGuard} from "./_guards/prevent-unsaved-changes.guard";
import {LikeListsComponent} from "./like-lists/like-lists.component";
import {ConversationComponent} from "./conversation/conversation.component";
import {ConversationResolver} from "./_resolvers/conversation.resolver";
import {AdminPanelComponent} from "./admin/admin-panel/admin-panel.component";
import {AdminGuard} from "./_guards/admin.guard";

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
      {path: 'conversation/:username', component: ConversationComponent, resolve: {member: ConversationResolver}},
      {path: 'feed', component: FeedComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'my-profile', component: MyProfileComponent},
      {path: 'settings', component: SettingsComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'settings-photo', component: SettingsPhotoComponent},
      {path: 'like-lists', component: LikeListsComponent},
      {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]}
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
