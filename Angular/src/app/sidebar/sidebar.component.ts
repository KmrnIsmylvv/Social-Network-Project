import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Member} from "../_models/member";
import {MembersService} from "../_services/members.service";
import {AuthGuard} from "../_guards/auth.guard";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class SidebarComponent implements OnInit {

  constructor(private accountService: AccountService, private memberService: MembersService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
