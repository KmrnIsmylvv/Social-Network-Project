import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Member} from "../_models/member";
import {User} from "../_models/user";
import {AccountService} from "../_services/account.service";
import {MembersService} from "../_services/members.service";
import {take} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../../assets/css/style.css', '../../assets/css/tailwind.css',
    '../../assets/css/icons.css', '../../assets/css/uikit.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService,
              private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  updateMember() {
    console.log(this.member);
    this.toastr.success('Profile updated successfully');
    this.editForm.reset(this.member);
  }
}
