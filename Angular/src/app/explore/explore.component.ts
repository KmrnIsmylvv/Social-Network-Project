import {Component, OnInit} from '@angular/core';
import {Member} from "../_models/member";
import {MembersService} from "../_services/members.service";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class ExploreComponent implements OnInit {
  members: Member[];

  constructor(private memberService: MembersService) {
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    })
  }

}
