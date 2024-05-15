import { inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

export default class BaseService {

  protected http = inject(HttpClient);
  protected toastrService = inject(ToastrService);

  protected getEndpointV1(prefix: string) {
    return `${environment.apiBaseUrl}/${prefix}`;
  }
}
