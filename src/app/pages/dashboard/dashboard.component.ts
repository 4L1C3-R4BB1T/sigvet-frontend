import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import BaseStoreComponent from '../../base/base-store.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, HeaderComponent, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseStoreComponent implements OnInit {

  isLoading = signal(false);
  #authService = inject(AuthService);
  #accountService = inject(AccountService);

  public async ngOnInit() {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 300);
    await this.#authService.loadingUserInfo(this.#accountService);
  }

}
