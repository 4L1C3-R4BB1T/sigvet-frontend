import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import menuVisibilityReducer, {
  MENU_VISIBILITY_FEATURE_KEY,
} from './store/reducers/menu-visibility.reducer';
import { JwtModule } from '@auth0/angular-jwt';
import { provideToastr } from 'ngx-toastr';
import { USER_FEATURE_KEY, userReducer } from './store/reducers/user.reducer';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr({
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 3000,
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(JwtModule.forRoot({})),
    provideStore({
      [MENU_VISIBILITY_FEATURE_KEY]: menuVisibilityReducer,
      [USER_FEATURE_KEY]: userReducer,
    }),
    provideAnimationsAsync(),
  ],
};
