import { environment } from "../../environments/environment";

export default class BaseService {

  protected getEndpoint(prefix: string) {
    return `${environment.apiBaseUrl}/${prefix}`;
  }
}
