import {BaseStore} from "../store/base.store";
import {Match} from "../model/match";
import {computed, DestroyRef, effect, inject, Injectable} from "@angular/core";
import {MatchListService} from "@einsatzplan/einsatzplan-lib/match-list/MatchList.service";
import {tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {firstBy} from 'thenby';
import {EinsatzplanLibStore} from "@einsatzplan/einsatzplan-lib/einsatzplan-lib.store";

export class Loader {

}

interface MatchListState {
  matches: Match[];
}

@Injectable()
export class MatchListStore extends BaseStore<MatchListState> {
  readonly #teamStore = inject(EinsatzplanLibStore);
  readonly #matchListService = inject(MatchListService);
  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    super({
      matches: []
    });

    effect(() => {
      const team = this.#teamStore.team();
      this.#matchListService.loadMatchList$(team.championship, team.teamName).pipe(
        tap(matches => this.patchState(draft => ({matches}))),
        takeUntilDestroyed(this.#destroyRef),
      ).subscribe(
        // FIXME: implement error handling
      );
    }, {allowSignalWrites: true})
  }

  matches = computed(() => [...this.state().matches]
    .sort(firstBy('date').thenBy('startTime'))
  );
}
