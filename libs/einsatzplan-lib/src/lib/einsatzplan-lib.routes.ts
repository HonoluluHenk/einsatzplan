import {ActivatedRouteSnapshot, Route} from '@angular/router';
import {EinsatzplanLibComponent} from './einsatzplan-lib.component';
import {EinsatzplanLibStore} from "@einsatzplan/einsatzplan-lib/einsatzplan-lib.store";
import {inject} from "@angular/core";
import {MatchListComponent} from "@einsatzplan/einsatzplan-lib/match-list/MatchList.component";

export const einsatzplanLibRoutes: Route[] = [
  {
    path: '',
    component: EinsatzplanLibComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'MTTV 24%2F25/Ostermundigen III'
      },
      {
        path: ':championship/:teamName',
        pathMatch: 'full',
        component: MatchListComponent,
        providers: [
          EinsatzplanLibStore,
        ],
        resolve: {
          init: (route: ActivatedRouteSnapshot) => inject(EinsatzplanLibStore)
            .initFromRoute(route.params['championship'], route.params['teamName'])
        },

      },
    ]
  }

];
