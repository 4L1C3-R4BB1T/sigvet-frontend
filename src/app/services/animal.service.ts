import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  #http = inject(HttpClient);

  public findAll() {
    return this.#http.get("")
  }
}
