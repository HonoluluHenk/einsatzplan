import { provideHttpClient } from '@angular/common/http';
import {
  type ApplicationConfig,
  importProvidersFrom,
  Injector,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideRouter } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import type { IconPack } from '@fortawesome/angular-fontawesome/types';
import { fas } from '@fortawesome/free-solid-svg-icons';
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
    {
      provide: FaIconLibrary,
      deps: [Injector],
      useFactory: (parentInjector: Injector) => addFaIconPacks(parentInjector, fas),
    },
  ],
};

function addFaIconPacks(
  parentInjector: Injector,
  ...packs: IconPack[]
): FaIconLibrary {
  const injector = Injector.create({
    parent: parentInjector,
    providers: [FaIconLibrary],
  });
  const library = injector.get(FaIconLibrary);
  library.addIconPacks(...packs);

  return library;
}
