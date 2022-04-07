import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Message} from '../_models/message';
import {MessageService} from "../_services/message.service";
import {MembersService} from "../_services/members.service";
import {NgForm} from "@angular/forms";
import {User} from "../_models/user";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
