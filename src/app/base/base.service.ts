import { inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { APIResponseError } from "../models/api-response-error";

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

  protected handleException(ex: any) {
    console.log(ex);
    if (!ex?.error) {
      this.toastrService.error('Erro interno, tente mais tarde.');
      return;
    }
    const error = ex.error as APIResponseError;
    if (error.result instanceof Array) {
      const result = error.result as string[];
      for (const messageError of result) {
        this.toastrService.warning(messageError);
      }
    } else if (typeof error.result === 'string') {
      this.toastrService.warning(error.result)
    }
  }
}
