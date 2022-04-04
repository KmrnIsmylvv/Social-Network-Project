import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../_models/member";
import {PresenceService} from "../_services/presence.service";

@Component({
  selector: 'app-member-cards',
  templateUrl: './member-cards.component.html',
  styleUrls: ['./member-cards.component.css']
})
export class MemberCardsComponent implements OnInit {
  @Input() member: Member;

  constructor(public presence: PresenceService) {
  }

  ngOnInit(): void {
  }

}
