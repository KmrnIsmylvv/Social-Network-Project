import {Component, OnInit} from '@angular/core';
import {Member} from "../_models/member";
import {MembersService} from "../_services/members.service";
import {User} from "../_models/user";
import {Pagination} from "../_models/pagination";

@Component({
  selector: 'app-like-lists',
  templateUrl: './like-lists.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class LikeListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination;

  constructor(private memberService: MembersService) {
  }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadLikes();
  }

}
