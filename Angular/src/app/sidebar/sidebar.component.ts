import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Member} from "../_models/member";
import {MembersService} from "../_services/members.service";
import {AuthGuard} from "../_guards/auth.guard";
import {Observable, take} from "rxjs";
import {User} from "../_models/user";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class SidebarComponent implements OnInit {
  member: Member;
  user: User;

  constructor(private accountService: AccountService, private memberService: MembersService,
              private route: ActivatedRoute, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
