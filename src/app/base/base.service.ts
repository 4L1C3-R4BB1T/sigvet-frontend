import { inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

export default class BaseService {

  protected http = inject(HttpClient);

  protected getEndpointV1(prefix: string) {
    return `${environment.apiBaseUrl}/${prefix}`;
  }
}
