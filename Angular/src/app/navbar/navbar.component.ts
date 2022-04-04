import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Route, Router} from "@angular/router";
import {MembersService} from "../_services/members.service";
import {Member} from "../_models/member";
import {User} from "../_models/user";
import {take} from "rxjs";
import {Message} from "../_models/message";
import {Pagination} from "../_models/pagination";
import {MessageService} from "../_services/message.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/tailwind.css',
    '../../assets/css/icons.css', '../../assets/css/uikit.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  messages: Message[] = [];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private accountService: AccountService, private router: Router,
              private messageService: MessageService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
