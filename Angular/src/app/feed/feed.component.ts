import {Component, OnInit} from '@angular/core';
import {MembersService} from "../_services/members.service";
import {Member} from "../_models/member";
import {Pagination} from "../_models/pagination";
import {UserParams} from "../_models/userParams";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class FeedComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;


  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

}
