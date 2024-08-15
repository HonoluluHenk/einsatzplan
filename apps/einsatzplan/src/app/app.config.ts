import { provideHttpClient } from '@angular/common/http';
import { type ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideRouter } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// eslint-disable-next-line @nx/enforce-module-boundaries
import firebaseClient from '../../../../developer-local-settings/config/firebase-client.json';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de-CH',
    },
    // provideClientHydration(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(),
    provideRouter(appRoutes),
    provideFirebaseApp(() => initializeApp(firebaseClient)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    importProvidersFrom([FontAwesomeModule]),
  ],
};
