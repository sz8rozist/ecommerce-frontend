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
import {NG_EVENT_PLUGINS} from '@taiga-ui/event-plugins';
const apiConfig = new Configuration({
  basePath: environment.apiUrl,
});

bootstrapApplication(AppComponent, {
  providers: [
    NG_EVENT_PLUGINS,
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    AuthServiceService,
    { provide: Configuration, useValue: apiConfig },  // API kliens konfiguráció
    importProvidersFrom(ApiModule.forRoot(() => apiConfig)),  // ApiModule inicializálása
  ],
}).catch((err) => console.error(err));
