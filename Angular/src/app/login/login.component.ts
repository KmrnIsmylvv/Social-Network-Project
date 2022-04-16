import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Router} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class LoginComponent implements OnInit {
  fbAccessToken: string | null = null;
  fbLoading = false;

  model: any = {};

  constructor(public accountService: AccountService, private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/feed');
    }, error => {
      this.toastr.error(error.error);
    })
  }

  getFacebookLoginStatus = async () => {
    window.FB.getLoginStatus((response: { status: string; authResponse: { accessToken: string; }; }) => {
      if (response.status === 'connected') {
        this.fbAccessToken = response.authResponse.accessToken;
      }
    })
  }

  facebookLogin = () => {
    this.fbLoading = true;
    const apiLogin = (accesToken: string) => {
      this.accountService.fbLogin(accesToken).subscribe(user => {
        this.fbLoading = false;
        this.router.navigateByUrl('/feed');
      }, error => {
        console.log(error);
        this.fbLoading = false;
      })
    }
    if (this.fbAccessToken) {
      apiLogin(this.fbAccessToken);
    } else {
      window.FB.login((response: { authResponse: { accessToken: string; }; }) => {
        apiLogin(response.authResponse.accessToken);
      }, {scope: 'public_profile,email'})
    }
  }
}
