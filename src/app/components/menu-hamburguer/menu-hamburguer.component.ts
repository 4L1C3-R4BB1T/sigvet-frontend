import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import BaseStoreComponent from '../../base/base.component';
import { SidenavActions, selectMenuSidenavValue } from '../../store/reducers/menu-visibility.reducer';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-menu-hamburguer',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf],
  templateUrl: './menu-hamburguer.component.html',
  styleUrl: './menu-hamburguer.component.scss'
})
export class MenuHamburguerComponent extends BaseStoreComponent {

  public opened = this.store.selectSignal(selectMenuSidenavValue);

  public open() {
    this.store.dispatch(SidenavActions.toggleMenu());
  }
}
