import {BaseStore} from "../store/base.store";
import {Match} from "../model/match";
import {computed, effect, inject, Injectable} from "@angular/core";
import {Subject, switchMap} from "rxjs";
import {firstBy} from 'thenby';
import {CurrentTeam, EinsatzplanLibStore} from "@einsatzplan/einsatzplan-lib/einsatzplan-lib.store";
import {Database, objectVal, ref} from "@angular/fire/database";
import {ID} from "@einsatzplan/einsatzplan-lib/types/ID.type";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

interface MatchListState {
  matches: Match[];
}

@Injectable()
export class MatchListStore extends BaseStore<MatchListState> {
  readonly #teamStore = inject(EinsatzplanLibStore);
  readonly #team$ = new Subject<CurrentTeam>();
  readonly #db = inject(Database);

  constructor() {
    super({
      matches: []
    });

    const values$ = this.#team$.pipe(
      switchMap(team => objectVal<Record<ID<'Match'>, Match>>(
        ref(this.#db, `/championship/${team.championship.backendId}/${team.teamName}/matches`),
      )),
      takeUntilDestroyed(),
    ).subscribe({
      next: next => {
        console.log('values', values$);
        this.patchState(draft => ({matches: Object.values(next)}));
      },
      error: console.error
    });

    effect(() => {
      const team = this.#teamStore.team();
      this.#team$.next(team);
    });

  }

  matches = computed(() =>
    [...this.state().matches]
      .sort(firstBy('date').thenBy('startTime'))
  );

}
