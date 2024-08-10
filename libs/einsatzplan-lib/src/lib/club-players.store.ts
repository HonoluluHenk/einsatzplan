import { computed, inject, Injectable } from '@angular/core';
import { BaseStore } from './store/base.store';
import { ClubID } from './model/Club';
import { Player, PlayerID } from './model/Player';
import { of, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrentTeamStore } from './current-team.store';
import { ClubPlayersService } from './club-players.service';
import { firstBy } from 'thenby';

interface ClubPlayersState {
  clubID: ClubID | undefined;
  players: Record<PlayerID, Player>;
}

@Injectable()
export class ClubPlayersStore extends BaseStore<ClubPlayersState> {
  readonly #teamStore = inject(CurrentTeamStore);
  readonly #clubID$ = new Subject<ClubID | undefined>();
  readonly #clubPlayersService = inject(ClubPlayersService);

  constructor() {
    super({
      clubID: undefined,
      players: {},
    });

    this.#clubID$
      .pipe(
        switchMap((clubID) => {
          if (!clubID) {
            return of({});
          }
          const currentTeam = this.#teamStore.team();
          return this.#clubPlayersService.eligiblePlayers$(
            currentTeam.championship,
            currentTeam.league,
            currentTeam.teamName
          );
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (next) => {
          this.patchState((draft) => {
            draft.players = next;
          });
        },
        error: console.error,
      });
  }

  clubChanged(clubID: ClubID): void {
    this.#clubID$.next(clubID);
  }

  players = computed(() => this.state().players);
  playerList = computed(() => {
    return [...Object.values(this.state().players)].sort(
      firstBy((player) => player.name.displayedName)
    );
  });
}
