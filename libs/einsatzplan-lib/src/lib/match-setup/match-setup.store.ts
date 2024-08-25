import { computed, inject, Injectable, type Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatchID } from '@einsatzplan/model/Match';
import { PlannedMatchSetup, PlayerSetup } from '@einsatzplan/model/PlannedMatchSetup';
import { PlayerID } from '@einsatzplan/model/Player';
import { map } from 'rxjs';
import { CurrentTeamStore } from '../current-team.store';
import { BaseStore } from '../store/base.store';
import { MatchSetupService } from './match-setup.service';

type MatchSetupState = Record<string, never>;


@Injectable()
export class MatchSetupStore extends BaseStore<MatchSetupState> {
  readonly #currentTeamStore = inject(CurrentTeamStore);
  readonly #matchSetupService = inject(MatchSetupService);

  constructor() {
    super({});
  }

  private readMatchesFromDB(): Signal<Record<MatchID, PlannedMatchSetup>> {
    const team = this.#currentTeamStore.team();

    return toSignal(
      this.#matchSetupService.allTeamMatchesSetup$(team.championship, team.league, team.teamID).pipe(
        map(matches => matches ?? {}),
      ),
      {initialValue: {}},
    );

  }

  private matches: Signal<Record<MatchID, PlannedMatchSetup>> = this.readMatchesFromDB();

  forMatch = (matchID: MatchID): Signal<PlannedMatchSetup | undefined> => computed<PlannedMatchSetup | undefined>(() => {
    return this.matches()[matchID];
  });

  replacePlayerSetup(
    matchID: MatchID,
    playerID: PlayerID,
    setup: PlayerSetup,
  ): void {
    this.#matchSetupService.putPlayerSetup(
      this.#currentTeamStore.team().championship,
      this.#currentTeamStore.team().league,
      this.#currentTeamStore.team().teamID,
      matchID,
      playerID,
      setup,
    );
    // let firebase work its magic
  }
}
