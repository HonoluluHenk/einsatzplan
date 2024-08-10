import {de} from 'date-fns/locale';
import {parseID} from '../types/ID.type';
import {MinRequiredPlayersConstraint} from './MinRequiredPlayersConstraint';
import type {PlannedMatchSetup, PlayerPlanningStatus, PlayerSetup} from './PlannedMatchSetup';
import type {PlayerID} from './Player';

describe('STTVSetupConstraint', () => {
  const constraint = MinRequiredPlayersConstraint.sttv(de);

  describe('for a setup with just enough ready players', () => {
    it('returns an ok status', () => {
      const setup: PlannedMatchSetup = {players: {}};

      const result = constraint.analyze(setup);

      expect(result.status)
        .toBe('error');
      expect(result.message)
        .toBe('Nicht genug Spieler geplant');
    });
  });

  describe('for no setup', () => {
    it('returns an error status and a message', () => {
      const setup: PlannedMatchSetup = {players: {}};

      const result = constraint.analyze(setup);

      expect(result.status)
        .toBe('error');
      expect(result.message)
        .toBe('Nicht genug Spieler geplant');
    });
  });

  describe('for a setup with too few players', () => {
    it.each([
      matchSetup('available'),
      matchSetup('available', 'available'),
    ])(
      'with setup %s it returns an error status and a message',
      (setup) => {
        const result = constraint.analyze(setup);

        expect(result.status)
          .toBe('error');
        expect(result.message)
          .toBe('Nicht genug Spieler geplant');
      },
    );
  });

  describe('for setups with maybe players', () => {
    it.each([
      [matchSetup('available', 'available', 'maybe'), 1],
      [matchSetup('available', 'maybe', 'maybe'), 2],
      [matchSetup('maybe', 'maybe', 'maybe'), 3],
    ])(
      'with setup %s it returns a warning status and a message',
      (
        setup,
        maybePlayers,
      ) => {
        const result = constraint.analyze(setup);

        expect(result.status)
          .toBe('warning');
        expect(result.message)
          .toBe(`Genug Spieler geplant, aber ${maybePlayers} haben noch nicht definitiv zugesagt.`);
      },
    );
  });

  function matchSetup(
    ...playersInStatus: PlayerPlanningStatus[]
  ): PlannedMatchSetup {
    const players: Record<PlayerID, PlayerSetup> = {};

    for (const [idx, status] of playersInStatus.entries()) {
      const id = parseID('Player', String(idx + 1));
      players[id] = {status};
    }

    const result = {players};
    result.toString = () => {
      const available = playersInStatus.filter((s) => s === 'available').length;
      const maybe = playersInStatus.filter((s) => s === 'maybe').length;
      const unknown = playersInStatus.filter((s) => s === 'yet-unknown').length;
      const unavailable = playersInStatus.filter((s) => s === 'unavailable').length;
      return `PlannedMatchSetup{available=${available}, maybe=${maybe}, unknown=${unknown}, unavailable=${unavailable}}`;
    };

    return result;
  }
});
