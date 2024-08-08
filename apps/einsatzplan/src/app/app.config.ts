import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {provideHttpClient} from "@angular/common/http";
import firebaseClient from '../../../../developer-local-settings/config/firebase-client.json';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'de-CH',
    },
    // provideClientHydration(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(
    ),
    provideRouter(appRoutes),
    provideFirebaseApp(() => initializeApp(firebaseClient)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
};
