import { MinRequiredPlayersConstraint } from './MinRequiredPlayersConstraint';
import type {
  PlannedMatchSetup,
  PlayerPlanningStatus,
  PlayerSetup,
} from './PlannedMatchSetup';
import { parseID } from '../types/ID.type';
import type { PlayerID } from './Player';
import { de } from 'date-fns/locale';

describe('STTVSetupConstraint', () => {
  const constraint = MinRequiredPlayersConstraint.sttv(de);

  describe('for a setup with just enough ready players', () => {
    it('returns an ok status', () => {
      const setup: PlannedMatchSetup = { players: {} };

      const result = constraint.analyze(setup);

      expect(result.status).toBe('error');
      expect(result.message).toBe('Nicht genug Spieler geplant');
    });
  });

  describe('for no setup', () => {
    it('returns an error status and a message', () => {
      const setup: PlannedMatchSetup = { players: {} };

      const result = constraint.analyze(setup);

      expect(result.status).toBe('error');
      expect(result.message).toBe('Nicht genug Spieler geplant');
    });
  });

  describe('for a setup with too few players', () => {
    it('returns an error status and a message', () => {
      const setup = matchSetup([1, 'available']);

      const result = constraint.analyze(setup);

      expect(result.status).toBe('error');
      expect(result.message).toBe('Nicht genug Spieler geplant');
    });
  });

  function matchSetup(
    ...players: [id: string | number, status: PlayerPlanningStatus][]
  ): PlannedMatchSetup {
    const result: Record<PlayerID, PlayerSetup> = {};
    for (const [id, status] of players) {
      result[parseID('Player', String(id))] = { status };
    }
    return { players: result };
  }
});
