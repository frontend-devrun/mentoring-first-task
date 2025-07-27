import { ApplicationConfig, importProvidersFrom, ENVIRONMENT_INITIALIZER, Provider } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { userReducer } from './store/users/user.reducer';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        // Любая твоя инициализация

        console.log('Приложение инициализируется🚀');
      }
    },
    provideRouter(routes)
    , provideHttpClient()
  ]
};
