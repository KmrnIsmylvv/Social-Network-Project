import {Component, OnInit, Output} from '@angular/core';
import {MembersService} from "../_services/members.service";
import {Member} from "../_models/member";
import {Pagination} from "../_models/pagination";
import {UserParams} from "../_models/userParams";
import {Photo} from "../_models/photo";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class FeedComponent implements OnInit {
  members: Member[];
  userParams: UserParams;
  photo: Photo;


  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  getPhotoForMember() {

    let photo: Photo;
    for (const member of this.members) {
      console.log(member.photos);
      photo = member.photos?.slice(-1)[0];

    }
    console.log(photo);
    return photo;
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.photo = this.getPhotoForMember();
    })
  }
}
