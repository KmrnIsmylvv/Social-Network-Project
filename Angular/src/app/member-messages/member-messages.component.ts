import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../_models/message';
import {MessageService} from "../_services/message.service";
import {MembersService} from "../_services/members.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() username: string;
  messages: Message[];


  constructor(private messageService: MessageService, private memberService: MembersService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessageThread(this.username).subscribe(messages => {
      this.messages = messages;
    })
  }

}
