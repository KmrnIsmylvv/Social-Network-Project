import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SettingsComponent} from "../settings/settings.component";
import {ConfirmService} from "../_services/confirm.service";

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmService: ConfirmService) {
  }

  canDeactivate(component: SettingsComponent): boolean | Observable<boolean> {
    if (component.editForm.dirty) {
      return this.confirmService.confirm();
    }
    return true;
  }

}
