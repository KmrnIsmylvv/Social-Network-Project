import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from '../_models/message';
import {MessageService} from "../_services/message.service";
import {MembersService} from "../_services/members.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AccountService} from "../_services/account.service";
import {User} from "../_models/user";
import {take} from "rxjs";
import {Member} from "../_models/member";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() username: string;
  messages: Message[] = [];
  messageContent: string;
  user: User

  constructor(public messageService: MessageService, private memberService: MembersService,) {
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessageThread(this.username).subscribe(messages => {
      this.messages = messages;
    })
  }

  sendMessage() {
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm.reset();
    })
  }

}
