import {parseID} from '../../types/ID.type';
import {
  debugPlayerSetup,
  type PlannedMatchSetup,
  type PlayerPlanningStatus,
  type PlayerSetup,
} from '../PlannedMatchSetup';
import type {PlayerID} from '../Player';
import {MinRequiredPlayersConstraint} from './MinRequiredPlayersConstraint';

describe('MinRequiredPlayersConstraint', () => {
  const constraint = MinRequiredPlayersConstraint.sttv();

  describe('for a setup with enough players', () => {

    it.each([
      matchSetup('available', 'available', 'available'),
      matchSetup('available', 'available', 'available', 'available'),
    ])('returns an ok status and a message for %s', (setup) => {

      const result = constraint.analyze(setup);

      expect(result.status)
        .toBe('ok');
      expect(result.message)
        .toBe('OK');
    });
  });

  describe('for no setup', () => {
    it('returns an error status and a message', () => {
      const setup: PlannedMatchSetup = {players: {}};

      const result = constraint.analyze(setup);

      expect(result.status)
        .toBe('invalid');
      expect(result.message)
        .toBe('Nicht genug Spieler geplant');
    });
  });

  describe('for a setup with not enough ready players', () => {
    it.each([
      matchSetup(),
      matchSetup('unavailable'),
      matchSetup('unavailable', 'unavailable'),
      matchSetup('unavailable', 'unavailable', 'unavailable'),
    ])('returns an error status with message for %s', (setup: PlannedMatchSetup) => {

      const result = constraint.analyze(setup);

      expect(result.status)
        .toBe('invalid');
      expect(result.message)
        .toBe('Nicht genug Spieler geplant');
    });
  });

  describe('for a setup with not enough planned players but some are maybe', () => {
    it.each([
      matchSetup('maybe', 'available', 'available'),
      matchSetup('maybe', 'maybe', 'available'),
      matchSetup('maybe', 'maybe', 'maybe'),
    ])('returns a warning status with message for %s', (setup: PlannedMatchSetup) => {

      const result = constraint.analyze(setup);

      expect(result.status)
        .toBe('warning');
      expect(result.message)
        .toBe('Nicht genug definitive Zusagen');
    });
  });

  describe('for a setup with too few players', () => {
    it('returns an error status and a message', () => {
      const setup = matchSetup('available');

      const result = constraint.analyze(setup);

      expect(result.status)
        .toBe('invalid');
      expect(result.message)
        .toBe('Nicht genug Spieler geplant');
    });
  });

  function matchSetup(
    ...playersInStatus: PlayerPlanningStatus[]
  ): PlannedMatchSetup {
    const setup: Record<PlayerID, PlayerSetup> = {};
    for (const [idx, status] of playersInStatus.entries()) {
      const id = parseID('Player', String(idx + 1));
      setup[id] = {status};
    }
    const result: PlannedMatchSetup = {players: setup};
    result.toString = () => debugPlayerSetup(setup);

    return result;
  }
});
