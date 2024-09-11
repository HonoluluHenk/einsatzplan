import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { NamedEntity } from './Name';

export type LeagueID = ID<'League'>;
export type League = NamedEntity<LeagueID>;
