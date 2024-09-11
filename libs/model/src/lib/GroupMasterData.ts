import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { Championship } from './Championship';
import type { NamedEntity } from './Name';
import type { Season } from './Season';

export type GroupID = ID<'Group'>;
export type Group = NamedEntity<GroupID>

export interface GroupMasterData extends Group {
  clickTTUrl: string;
  system: string;
  season: Season;
  championship: Championship;
}
