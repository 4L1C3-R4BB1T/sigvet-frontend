import { inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

export interface FilterParams {
  equal_filters?: string;
  in_filters?: string;
  sort?: string;
  size?: string | number;
  page?: string | number;
}


export default class BaseService {

  protected http = inject(HttpClient);
  protected toastrService = inject(ToastrService);

  protected getFilterParams(filters?: FilterParams): string {
    if (!filters) return '';

    let concat = '?';
    if (filters.size) {
      concat += `size=${filters.size}`;
    }
    if (filters.page) {
      concat += `page=${filters.page}`;
    }
    if (filters.sort) {
      concat += `sort=${filters.sort}`;
    }
    if (filters.in_filters) {
      concat += `in_filters=${filters.in_filters}`;
    }
    if (filters.equal_filters) {
      concat += `equal_filters=${filters.equal_filters}`;
    }

    return concat;
  }

  protected getEndpointV1(prefix: string) {
    return `${environment.apiBaseUrl}/${prefix}`;
  }
}
