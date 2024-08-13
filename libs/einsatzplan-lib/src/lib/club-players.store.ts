import {computed, inject, Injectable, untracked} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { isNullish, Nullish } from './util/nullish';
import {of, Subject, switchMap} from 'rxjs';
import {firstBy} from 'thenby';
import {ClubPlayersService} from './club-players.service';
import {CurrentTeamStore} from './current-team.store';
import {ClubID} from './model/Club';
import {Player, PlayerID} from './model/Player';
import {BaseStore} from './store/base.store';

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
            currentTeam.teamName,
          );
        }),
        takeUntilDestroyed(),
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
      firstBy((player) => player.name.displayedName),
    );
  });

  lookupPlayer(id: PlayerID | Nullish): Player | undefined {
    if (isNullish(id)) {
      return undefined;
    }
    return untracked(() => this.state()).players[id] ?? undefined;
  };
}
