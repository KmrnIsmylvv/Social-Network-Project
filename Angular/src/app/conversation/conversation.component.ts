import {Component, OnDestroy, OnInit} from '@angular/core';
import {Member} from "../_models/member";
import {MembersService} from "../_services/members.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Message} from '../_models/message';
import {MessageService} from "../_services/message.service";
import {AccountService} from "../_services/account.service";
import {User} from "../_models/user";
import {take} from "rxjs";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class ConversationComponent implements OnInit, OnDestroy {
  member: Member;
  messages: Message[] = [];
  user: User;

  constructor(private memberService: MembersService, private route: ActivatedRoute, private messageService: MessageService,
              private accountService: AccountService, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data.member;
    })

    this.getMessagesViaHub();
  }

  getMessagesViaHub() {
    if (this.messages.length === 0) {
      this.messageService.createHubConnection(this.user, this.member.username);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
