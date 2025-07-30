import { ApplicationConfig } from "@angular/core";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideNoopAnimations(),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
