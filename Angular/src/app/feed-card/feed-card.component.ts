import {Component, Input, OnInit} from '@angular/core';
import {MembersService} from "../_services/members.service";
import {Member} from "../_models/member";
import {UserParams} from "../_models/userParams";
import {mkdir} from "fs";
import {Photo} from "../_models/photo";

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class FeedCardComponent implements OnInit {
  @Input() member: Member;
  @Input() photo: Photo;

  constructor() {
  }

  ngOnInit(): void {
  }

}
