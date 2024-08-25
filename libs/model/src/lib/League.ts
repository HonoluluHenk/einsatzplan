import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { Name } from './Name';

export type LeagueID = ID<'League'>;

export type LeagueName = Name;

export type League = LeagueName & {
  id: LeagueID;
}
