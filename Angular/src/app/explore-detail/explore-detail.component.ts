import {Component, OnInit} from '@angular/core';
import {Member} from "../_models/member";
import {MembersService} from "../_services/members.service";
import {ActivatedRoute} from "@angular/router";
import {Photo} from "../_models/photo";
import {ToastrService} from "ngx-toastr";
import {PresenceService} from "../_services/presence.service";
import {Followers} from "../_models/followers";

@Component({
  selector: 'app-explore-detail',
  templateUrl: './explore-detail.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class ExploreDetailComponent implements OnInit {
  member: Member;
  photos: Photo[];
  // followersCount: number ;
  followers: Followers[];

  constructor(private memberService: MembersService, private route: ActivatedRoute,
              private toastr: ToastrService, public presence: PresenceService) {
  }

  ngOnInit(): void {
    this.loadMember();
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have liked ' + member.knownAs);
    })
  }

  getPhotos() {
    const photos: Photo[] = [];
    for (const photo of this.member.photos) {
      photos.push(photo);
    }
    return photos;
  }

  getFollowers() {
    const followers: Followers[] = [];
    // for (let i = 0; i <= followers.length; i++) {
    //   followers.push(followers[i]);
    // }
    for (const follower of this.member.followers) {
      followers.push(follower);
    }
    return followers;
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
      this.photos = this.getPhotos();
      this.followers = this.getFollowers();
    })
  }
}
