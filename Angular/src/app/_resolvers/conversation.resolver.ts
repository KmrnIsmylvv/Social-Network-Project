import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Member} from "../_models/member";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {MembersService} from "../_services/members.service";


@Injectable({
  providedIn: 'root'
})
export class ConversationResolver implements Resolve<Member> {

  constructor(private memberService: MembersService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Member> {
    return this.memberService.getMember(route.paramMap.get('username'));
  }

}
