import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastrModule} from "ngx-toastr";
import {FileUploadModule} from "ng2-file-upload";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ButtonsModule} from "ngx-bootstrap/buttons";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  exports: [
    ToastrModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule
  ]
})
export class SharedModule {
}
