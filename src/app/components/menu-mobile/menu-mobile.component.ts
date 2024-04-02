import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { AppState } from '../../store';
import { toggle } from '../../store/actions/menu.actions';

@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss'
})
export class MenuMobileComponent {

  #store = inject<Store<AppState>>(Store);

  open = toSignal(this.#store.select(state => state.menu.show));

  public opened = computed(() => this.open());


  public toggle(): void {
    this.#store.dispatch(toggle());
  }

}
