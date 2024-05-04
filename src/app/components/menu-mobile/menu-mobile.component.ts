import { Component, effect, signal } from '@angular/core';
import BaseStoreComponent from '../../base/base-store.component';
import { SidenavActions } from '../../store/reducers/menu-visibility.reducer';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-menu-mobile',
  standalone: true,
  imports: [],
  templateUrl: './menu-mobile.component.html',
  styleUrl: './menu-mobile.component.scss'
})
export class MenuMobileComponent extends BaseStoreComponent {

  isOpen = toSignal(this.store.select(state => state.menuVisibilityReducer.menuSidenav));

  toggle() {
    this.store.dispatch(SidenavActions.toggleMenu());
  }
}
