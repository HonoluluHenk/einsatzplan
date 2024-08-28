import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { Name } from './Name';

export type GroupID = ID<'Group'>;

export type GroupName = Name;

export interface GroupMasterData extends GroupName {
  id: GroupID;
  clickTTUrl: string;
  system: string;
}
