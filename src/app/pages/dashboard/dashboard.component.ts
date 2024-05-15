import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../components/header/header.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, HeaderComponent, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  isLoading = signal(false);
  #authService = inject(AuthService);

  public ngOnInit(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 300);
    this.#authService.loadingUserInfo();
  }

}
