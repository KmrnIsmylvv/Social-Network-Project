import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Member} from "../_models/member";
import {MembersService} from "../_services/members.service";
import {AuthGuard} from "../_guards/auth.guard";
import {Observable, take} from "rxjs";
import {User} from "../_models/user";
import {Photo} from "../_models/photo";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class SidebarComponent implements OnInit {
  user: User;
  member: Member;
  photos: Photo[];

  constructor(private accountService: AccountService, private route: ActivatedRoute,
              private router: Router, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }


  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
