import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { Championship } from './Championship';
import type { Name } from './Name';
import type { Season } from './Season';

export type GroupID = ID<'Group'>;

export type GroupName = Name;

export interface Group extends GroupName {
  id: GroupID;
}

export interface GroupMasterData extends GroupName {
  id: GroupID;
  clickTTUrl: string;
  system: string;
  season: Season;
  championship: Championship;
}
