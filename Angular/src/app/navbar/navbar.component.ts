import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/tailwind.css',
    '../../assets/css/icons.css', '../../assets/css/uikit.css']
})
export class NavbarComponent implements OnInit {

  constructor(private accountService: AccountService,private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }


}
