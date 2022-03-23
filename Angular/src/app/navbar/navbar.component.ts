import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Route, Router} from "@angular/router";
import {MembersService} from "../_services/members.service";
import {Member} from "../_models/member";
import {User} from "../_models/user";
import {take} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/tailwind.css',
    '../../assets/css/icons.css', '../../assets/css/uikit.css']
})
export class NavbarComponent implements OnInit {
  member: Member;
  user: User;


  constructor(private accountService: AccountService, private memberService: MembersService,
              private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMember(this.user.username).subscribe(member => this.member = member);
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
