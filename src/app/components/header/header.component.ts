import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuMobileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  openProfile = signal(false);
  #router = inject(Router);

  currentTitle = signal('Home');

  public ngOnInit() {
    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd))
      .subscribe(event => {
        var url = event.urlAfterRedirects.replace('/dashboard/', '');
        if (url.startsWith('/dashboard')) {
          this.currentTitle.set('Home');
        } else {
          this.currentTitle.set(`${url[0].toUpperCase()}${url.substring(1)}`);
        }
      });
  }

}
