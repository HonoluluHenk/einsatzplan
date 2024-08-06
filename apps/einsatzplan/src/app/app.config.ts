import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getDatabase, provideDatabase} from '@angular/fire/database';
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    // provideClientHydration(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(
    ),
    provideRouter(appRoutes),
    provideFirebaseApp(() => initializeApp({
      "projectId": "einsatzplan-dev",
      "appId": "1:205806418849:web:221fb76e3ddea01d6529e0",
      "databaseURL": "https://einsatzplan-dev-default-rtdb.europe-west1.firebasedatabase.app",
      "storageBucket": "einsatzplan-dev.appspot.com",
      "apiKey": "AIzaSyC0j1t6jDJtxbnnPOYJ4KKMNP8G7XtNlro",
      "authDomain": "einsatzplan-dev.firebaseapp.com",
      "messagingSenderId": "205806418849"
    })),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
};
