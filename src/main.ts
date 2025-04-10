import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/auth.interceptor';
import { ApiModule, Configuration } from './app/api';
import { environment } from './app/environment/environment';
import { importProvidersFrom } from '@angular/core';
import { AuthServiceService } from './app/auth/auth-service.service';
import { TUI_LANGUAGE } from '@taiga-ui/i18n';
import { TUI_HUNGARY_LANGUAGE } from './app/languages/hu';
const apiConfig = new Configuration({
  basePath: environment.apiUrl,
});

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    AuthServiceService,
    { provide: Configuration, useValue: apiConfig },  // API kliens konfiguráció
    importProvidersFrom(ApiModule.forRoot(() => apiConfig)),  // ApiModule inicializálása
    {
      provide: TUI_LANGUAGE,
      useValue: TUI_HUNGARY_LANGUAGE,
    }
  ],
}).catch((err) => console.error(err));
