import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class LoginComponent implements OnInit {
  model: any = {}

  // loggedIn: boolean = false;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.accountService.loggedIn = true;
    }, error => {
      console.log(error);
    })
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.accountService.loggedIn = !!user;
    }, error => {
      console.log(error);
    })
  }
}
