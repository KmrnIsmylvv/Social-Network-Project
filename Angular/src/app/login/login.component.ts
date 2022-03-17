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
  model: any = {};

  constructor(public accountService: AccountService, private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    // this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/sidebar');
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe(user => {
  //     this.loggedIn = !!user;
  //   }, error => {
  //     console.log(error);
  //   })
  // }
}
