import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store";

export default class BaseStoreComponent {

  protected store: Store<AppState> = inject(Store);


}
