import {computed, inject, Injectable} from "@angular/core";
import {BaseStore} from "@einsatzplan/einsatzplan-lib/store/base.store";
import {ID} from "@einsatzplan/einsatzplan-lib/types/ID.type";
import {Player} from "@einsatzplan/einsatzplan-lib/model";
import {of, Subject, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CurrentTeamStore} from "@einsatzplan/einsatzplan-lib/current-team.store";
import {ClubPlayersService} from "@einsatzplan/einsatzplan-lib/club-players.service";
import {firstBy} from "thenby";

interface ClubPlayersState {
  clubID: ID<'Club'> | undefined;
  players: Record<ID<'Player'>, Player>;
}

@Injectable()
export class ClubPlayersStore extends BaseStore<ClubPlayersState> {
  readonly #teamStore = inject(CurrentTeamStore);
  readonly #clubID$ = new Subject<ID<'Club'> | undefined>();
  readonly #clubPlayersService = inject(ClubPlayersService);

  constructor() {
    super({
      clubID: undefined,
      players: {}
    });


    this.#clubID$.pipe(
      switchMap(clubID => {
        if (!clubID) {
          return of({})
        }
        const currentTeam = this.#teamStore.team()
        return this.#clubPlayersService.eligiblePlayers$(currentTeam.championship, currentTeam.league, currentTeam.teamName)
      }),
      takeUntilDestroyed(),
    ).subscribe({
      next: next => {
        this.patchState(draft => {
          draft.players = next;
        });
      },
      error: console.error
    })
  }

  clubChanged(clubID: ID<'Club'>): void {
    this.#clubID$.next(clubID);
  }

  players = computed(() => this.state().players);
  playerList = computed(() => {
    return [...Object.values(this.state().players)]
      .sort(firstBy(player => player.name.displayedName))
  });
}
