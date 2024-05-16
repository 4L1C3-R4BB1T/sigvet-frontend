import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../environments/environment";

export default class BaseService {

  protected http = inject(HttpClient);
  protected toastrService = inject(ToastrService);

  protected getEndpointV1(prefix: string) {
    return `${environment.apiBaseUrl}/${prefix}`;
  }
}
