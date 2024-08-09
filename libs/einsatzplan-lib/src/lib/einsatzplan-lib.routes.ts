import {ActivatedRouteSnapshot, Route} from '@angular/router';
import {EinsatzplanLibComponent} from './einsatzplan-lib.component';
import {CurrentTeamStore} from "@einsatzplan/einsatzplan-lib/current-team.store";
import {inject} from "@angular/core";
import {MatchListComponent} from "@einsatzplan/einsatzplan-lib/match-list/MatchList.component";
import {ClubPlayersStore} from "@einsatzplan/einsatzplan-lib/club-players.store";
import {createID} from './types/ID.type';
import {CurrentPlayerStore} from "@einsatzplan/einsatzplan-lib/current-player.store";

export const einsatzplanLibRoutes: Route[] = [
  {
    path: '',
    component: EinsatzplanLibComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'MTTV 24%2F25/HE 3. Liga Gr. 3/Ostermundigen III'
      },
      {
        path: ':championship/:league/:teamName',
        pathMatch: 'full',
        component: MatchListComponent,
        providers: [
          CurrentTeamStore,
          CurrentPlayerStore,
          ClubPlayersStore,
        ],
        resolve: {
          initTeam: (route: ActivatedRouteSnapshot) => inject(CurrentTeamStore)
            .init({
              championship: route.params['championship'],
              league: route.params['league'],
              teamName: route.params['teamName']
            }),
          initClubPlayers: (route: ActivatedRouteSnapshot) => inject(ClubPlayersStore)
            .clubChanged(createID('Club', 'ignored'))
        },

      },
    ]
  }

];
