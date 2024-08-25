import { computed, effect, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Match } from '@einsatzplan/model/Match';
import { PlayerID } from '@einsatzplan/model/Player';
import { Subject, switchMap } from 'rxjs';
import { firstBy } from 'thenby';
import { TeamsService } from '../backend-dao/teams.service';
import { CurrentTeam, CurrentTeamStore } from '../current-team.store';
import { BaseStore } from '../store/base.store';

interface MatchListState {
  matches: Match[];
  currentPlayerId: PlayerID | undefined;
}

@Injectable()
export class MatchListStore extends BaseStore<MatchListState> {
  readonly #teamStore = inject(CurrentTeamStore);
  readonly #team$ = new Subject<CurrentTeam>();
  readonly #teamsService = inject(TeamsService);

  constructor() {
    super({
      matches: [],
      currentPlayerId: undefined,
    });

    this.#team$
      .pipe(
        switchMap((currentTeam) => {
          return this.#teamsService.matchesForTeam$(
            currentTeam.seasonID,
            currentTeam.championshipID,
            currentTeam.leagueID,
            currentTeam.teamID,
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe({
        next: (next) => {
          this.patchState((draft) => {
            draft.matches = Object.values(next);
          });
        },
        error: console.error,
      });

    effect(() => {
      const team = this.#teamStore.team();
      this.#team$.next(team);
    });
  }

  matches = computed(() =>
    [...this.state().matches].sort(firstBy('date')
      .thenBy('startTime')),
  );
}
