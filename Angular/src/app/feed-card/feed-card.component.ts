import {Component, Input, OnInit, Output} from '@angular/core';
import {MembersService} from "../_services/members.service";
import {Member} from "../_models/member";
import {UserParams} from "../_models/userParams";
import {mkdir} from "fs";
import {Photo} from "../_models/photo";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class FeedCardComponent implements OnInit {
  @Input() member: Member;
  // @Input() photo: Photo;
  @Input() photo: Photo;

  constructor(private memberService: MembersService, private toastr: ToastrService,) {
  }

  ngOnInit(): void {
    // this.getPhoto();
  }

 // public getPhoto() {
 //    this.photo = this.member.photos[this.member.photos.length - 1];
 //  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have liked ' + member.knownAs);
    })
  }
}
