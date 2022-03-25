import {Component, OnInit} from '@angular/core';
import {Member} from "../_models/member";
import {User} from "../_models/user";
import {AccountService} from "../_services/account.service";
import {MembersService} from "../_services/members.service";
import {take} from "rxjs";
import {Photo} from "../_models/photo";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-settings-photo',
  templateUrl: './settings-photo.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/tailwind.css',
    '../../assets/css/icons.css', '../../assets/css/uikit.css']
})
export class SettingsPhotoComponent implements OnInit {
  member: Member;
  photos: Photo[];
  user: User;

  constructor(private accountService: AccountService, private memberService: MembersService,
              private route: ActivatedRoute) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      })
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(x => x.id !== photoId);
      this.loadMember();
    })
  }

  getPhotos() {
    const photos: Photo[] = [];
    for (const photo of this.member.photos) {
      photos.push(photo);
    }
    return photos;
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
      this.photos = this.getPhotos();
    })
  }
}
