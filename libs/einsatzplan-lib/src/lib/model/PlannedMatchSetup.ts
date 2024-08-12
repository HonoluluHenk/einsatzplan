export type PlayerPlanningStatus =
  | 'available'
  | 'maybe'
  | 'yet-unknown'
  | 'unavailable'
  ;

import type {PlayerID} from './Player';

export type PlayerSetup = {
  status: PlayerPlanningStatus
};

export type PlannedMatchSetup = {
  players: Record<PlayerID, PlayerSetup>;
};

export type MatchSetupConstraintStatus = 'ok' | 'warning' | 'error';

export type SetupStatus = {
  status: MatchSetupConstraintStatus;
  message: string;
};

export interface MatchSetupConstraint {
  analyze(setup: PlannedMatchSetup): SetupStatus;
}

export function debugPlayerSetup(players: Record<PlayerID, PlayerSetup>): string {
  const available = Object.values(players)
    .filter((p) => p.status === 'available');
  const maybe = Object.values(players)
    .filter((p) => p.status === 'maybe');
  const yetUnknown = Object.values(players)
    .filter((p) => p.status === 'yet-unknown');
  const unavailable = Object.values(players)
    .filter((p) => p.status === 'unavailable');
  return `available: ${available.length}, maybe: ${maybe.length}, yet-unknown: ${yetUnknown.length}, unavailable: ${unavailable.length}`;
}
