export type PlayerPlanningStatus =
  | 'available'
  | 'maybe'
  | 'unavailable'
  | 'unknown'
  ;
export const PlayerPlanningStatus = {
  available: 'available',
  maybe: 'maybe',
  unavailable: 'unavailable',
  unknown: 'unknown',
} as const;

import type {PlayerID} from './Player';

export type PlayerSetup = {
  status: PlayerPlanningStatus
};

export function initialPlayerSetup(): PlayerSetup {
  return {
    status: 'unknown',
  };
}

export type PlannedMatchSetup = {
  players: Record<PlayerID, PlayerSetup>;
};

export function debugPlayerSetup(players: Record<PlayerID, PlayerSetup>): string {
  const available = Object.values(players)
    .filter((p) => p.status === 'available');
  const maybe = Object.values(players)
    .filter((p) => p.status === 'maybe');
  const unknown = Object.values(players)
    .filter((p) => p.status === 'unknown');
  const unavailable = Object.values(players)
    .filter((p) => p.status === 'unavailable');
  return `available: ${available.length}, maybe: ${maybe.length}, unavailable: ${unavailable.length}, unknown: ${unknown.length}`;
}
