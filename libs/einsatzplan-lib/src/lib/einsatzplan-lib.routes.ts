import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, Route } from '@angular/router';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import { ClubPlayersStore } from './club-players.store';
import { CurrentPlayerStore } from './current-player.store';
import { CurrentTeamStore } from './current-team.store';
import { EinsatzplanLibComponent } from './einsatzplan-lib.component';
import { MatchListComponent } from './match-list/MatchList.component';
import { MatchSetupStore } from './match-setup/match-setup.store';

export const einsatzplanLibRoutes: Route[] = [
  {
    path: '',
    component: EinsatzplanLibComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '24%2F25/MTTV 24%2F25/HE 3. Liga Gr. 2/Ostermundigen III',
      },
      {
        path: ':season/:championship/:group/:teamName',
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
            inject(CurrentTeamStore)
              .init({
                seasonID: parseID('Season', route.params['season']),
                championshipID: parseID('Championship', route.params['championship']),
                groupID: parseID('Group', route.params['group']),
                teamName: route.params['teamName'],
              }),
          initClubPlayers: (_route: ActivatedRouteSnapshot) =>
            inject(ClubPlayersStore)
              .clubChanged(parseID('Club', 'ignored')),
        },
      },
    ],
  },
];
