import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import BaseService, { FilterParams } from '../base/base.service';
import { Diagnostic } from '../models/diagnostic';
import { UpdateDiagnostic } from '../models/update-diagnostic';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService extends BaseService {

  public async findAll(filters?: FilterParams) {
    return await lastValueFrom(this.http.get(this.getEndpointV1(`diagnostics${this.getFilterParams(filters)}`))
      .pipe(map((response: any) => response.elements as Diagnostic[])));
  }

  public async findById(id: number) {
    try {
      return await lastValueFrom(this.http.get(this.getEndpointV1(`diagnostics/${id}`))
      .pipe(map((response: any) => response?.result as Diagnostic)))
    } catch (ex: any) {
      return null;
    }
  }

  public async create(content: UpdateDiagnostic) {
    try {
      return await lastValueFrom(this.http.post(this.getEndpointV1('diagnostics'), content)
        .pipe(map((response: any) => response.result as Diagnostic)));
    } catch (ex: any) {
      this.handleException(ex);
    }
    return null;
  }


  public async update(id: number, content: UpdateDiagnostic) {
    try {
     await lastValueFrom(this.http.put(this.getEndpointV1(`diagnostics/${id}`), content));
     return true;
    } catch (ex: any) {
      this.handleException(ex);
    }
    return false;
  }


  public async deleteById(id: number) {
    await lastValueFrom(this.http.delete(this.getEndpointV1(`diagnostics/${id}`)));
  }
}
