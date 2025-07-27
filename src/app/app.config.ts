import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { userReducer } from './store/users/user.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(StoreModule.forRoot({ count: userReducer })),
    provideNoopAnimations(),
    provideRouter(routes)
    , provideHttpClient()
  ]
};

