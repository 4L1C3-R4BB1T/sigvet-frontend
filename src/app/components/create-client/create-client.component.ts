import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../store';
import { toggleCreateClientModal } from '../../store/actions/modal-create-client.action';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.scss'
})
export class CreateClientComponent {

  #store: Store<AppState> = inject(Store<AppState>);

  public close() {
    this.#store.dispatch(toggleCreateClientModal());
  }
  
}
