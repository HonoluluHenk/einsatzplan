import {computed, effect, inject, Injectable} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Database, objectVal, ref} from '@angular/fire/database';
import {Subject, switchMap} from 'rxjs';
import {firstBy} from 'thenby';
import {CurrentTeam, CurrentTeamStore} from '../current-team.store';
import {Match, MatchID} from '../model/Match';
import {PlayerID} from '../model/Player';
import {BaseStore} from '../store/base.store';
import {cleanPathForFirebaseKey} from '../util/firebase-util';

interface MatchListState {
  matches: Match[];
  currentPlayerId: PlayerID | undefined;
}

@Injectable()
export class MatchListStore extends BaseStore<MatchListState> {
  readonly #teamStore = inject(CurrentTeamStore);
  readonly #team$ = new Subject<CurrentTeam>();
  readonly #db = inject(Database);

  constructor() {
    super({
      matches: [],
      currentPlayerId: undefined,
    });

    this.#team$
      .pipe(
        switchMap((currentTeam) => {
          const championship = cleanPathForFirebaseKey(
            currentTeam.championship.backendId,
          );
          const league = cleanPathForFirebaseKey(currentTeam.league);
          const team = cleanPathForFirebaseKey(currentTeam.teamName);

          const path = `/championship/${championship}/leagues/${league}/teams/${team}/matches`;
          return objectVal<Record<MatchID, Match>>(ref(this.#db, path));
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
