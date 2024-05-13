import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import menuVisibilityReducer, { MENU_VISIBILITY_FEATURE_KEY } from './store/reducers/menu-visibility.reducer';
import { JwtModule } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([])),
    provideStore({ [MENU_VISIBILITY_FEATURE_KEY]: menuVisibilityReducer }),
  ]
};
