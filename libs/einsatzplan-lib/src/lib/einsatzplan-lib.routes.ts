import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, Route } from '@angular/router';
import { ClubPlayersStore } from './club-players.store';
import { CurrentPlayerStore } from './current-player.store';
import { CurrentTeamStore } from './current-team.store';
import { EinsatzplanLibComponent } from './einsatzplan-lib.component';
import { MatchListComponent } from './match-list/MatchList.component';
import { MatchSetupStore } from './match-setup/match-setup.store';
import { parseID } from './types/ID.type';

export const einsatzplanLibRoutes: Route[] = [
  {
    path: '',
    component: EinsatzplanLibComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'MTTV 24%2F25/HE 3. Liga Gr. 3/Ostermundigen III',
      },
      {
        path: ':championship/:league/:teamName',
        pathMatch: 'full',
        component: MatchListComponent,
        providers: [
          CurrentTeamStore,
          CurrentPlayerStore,
          ClubPlayersStore,
          MatchSetupStore,
        ],
        resolve: {
          initTeam: (route: ActivatedRouteSnapshot) =>
            inject(CurrentTeamStore).init({
              championship: route.params['championship'],
              league: route.params['league'],
              teamName: route.params['teamName'],
            }),
          initClubPlayers: (_route: ActivatedRouteSnapshot) =>
            inject(ClubPlayersStore).clubChanged(parseID('Club', 'ignored')),
        },
      },
    ],
  },
];
