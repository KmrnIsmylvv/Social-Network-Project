import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, ReplaySubject, Subject} from "rxjs";
import {readSpanComment} from "@angular/compiler-cli/src/ngtsc/typecheck/src/comments";
import {User} from "../_models/user";
import {environment} from "../../environments/environment";
import {PresenceService} from "./presence.service";
import {CustomEncoder} from "../_models/custom-encoder";
import {ForgotPassword} from "../_models/forgot-password";
import {ResetPassword} from "../_models/reset-password";
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {GoogleAuth} from "../_models/google-auth";
import {AuthResponse} from "../_models/auth-response";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  private authChangeSub = new Subject<boolean>()

  constructor(private http: HttpClient, private presence: PresenceService,
              private externalAuthService: SocialAuthService) {
  }

  public signInWithGoogle = () => {
    return this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public signOutGoogle = () => {
    this.externalAuthService.signOut();
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public googleLogin= ( body: GoogleAuth)=>{
    return this.http.post<AuthResponse>(this.baseUrl+ 'account/GoogleLogin', body).pipe(
      map((response: any)=>{
        const user =response;
        if(user){
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    )
  }

  login(model: any) {
    return this.http.post<any>(this.baseUrl + 'account/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    )
  }

  fbLogin(accessToken: string) {
    return this.http.post(this.baseUrl + `account/fbLogin?accessToken=${accessToken}`, {}).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
      })
    )
  }

  public confirmEmail = (route: string, token: string, email: string) => {
    let params = new HttpParams({encoder: new CustomEncoder()})
    params = params.append('token', token);
    params = params.append('email', email);

    return this.http.get(this.baseUrl + 'account/EmailConfirmation', {params: params});
  }

  public forgotPassword = (route: string, body: ForgotPassword) => {
    return this.http.post(this.baseUrl + 'account/ForgotPassword', body);
  }

  public resetPassword = (route: string, body: ResetPassword) => {
    return this.http.post(this.baseUrl + 'account/ResetPassword', body);
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presence.stopHubConnection();
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
