import {Component, OnInit} from '@angular/core';
import {Member} from "../_models/member";
import {Photo} from "../_models/photo";
import {MembersService} from "../_services/members.service";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../_services/account.service";
import {take} from "rxjs";
import {User} from "../_models/user";
import {FileUploader} from "ng2-file-upload";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/icons.css',
    '../../assets/css/tailwind.css', '../../assets/css/uikit.css']
})
export class MyProfileComponent implements OnInit {
  member: Member;
  photos: Photo[];
  user: User;

  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private accountService: AccountService, private memberService: MembersService,
              private route: ActivatedRoute) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.initializeUploader();
    this.loadMember();

  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo/',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingAll = (file) => {
      file.withCredentials = true;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.member.photos.push(photo);
        if (photo.isMain) {
          this.user.photoUrl = photo.url;
          this.member.photoUrl = photo.url
          this.accountService.setCurrentUser(this.user);
        }
      }
    }
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
