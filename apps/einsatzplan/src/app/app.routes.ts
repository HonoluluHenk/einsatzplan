import {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('@einsatzplan/einsatzplan-lib').then(m => m.einsatzplanLibRoutes)
  }
];
