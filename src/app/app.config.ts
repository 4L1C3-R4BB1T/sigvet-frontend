import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { menuFeatureKey, menuReducer } from './store/reducers/menu.reducer';
import { modalCreateClientFeatureKey, modalCreateClientReducer } from './store/reducers/modal-create-client.reducer';
import { settingMenuFeatureKey, settingMenuReducer } from './store/reducers/setting-menu.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(
      {
        [menuFeatureKey]: menuReducer,
        [settingMenuFeatureKey]: settingMenuReducer,
        [modalCreateClientFeatureKey]: modalCreateClientReducer,
      }
    )
  ]
};