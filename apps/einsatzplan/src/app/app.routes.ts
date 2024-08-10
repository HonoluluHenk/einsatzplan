import type {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'einsatzplan'
  },
  {
    path: 'einsatzplan',
    loadChildren: () => import('@einsatzplan/einsatzplan-lib/einsatzplan-lib.routes')
      .then(m => m.einsatzplanLibRoutes)
  }
];
