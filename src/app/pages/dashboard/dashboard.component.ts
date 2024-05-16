import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import BaseStoreComponent from '../../base/base-store.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { selectUserInfo } from '../../store/reducers/user.reducer';

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

  public ngOnInit(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 300);
    this.#authService.loadingUserInfo();
    this.store.select(selectUserInfo).subscribe(console.log)
  }

}
