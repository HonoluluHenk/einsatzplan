import type { Database } from '@angular/fire/database';
import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { GroupID } from '@einsatzplan/model/GroupMasterData';
import type { Match, MatchID } from '@einsatzplan/model/Match';
import type { SeasonID } from '@einsatzplan/model/Season';
import type { TeamID } from '@einsatzplan/model/Team';
import { ref, set } from 'firebase/database';

export async function uploadMatches(
  seasonID: SeasonID,
  matches: Record<MatchID, Match>,
  championshipID: ChampionshipID,
  groupID: GroupID,
  teamID: TeamID,
  db: Database,
): Promise<Record<`Match:${string}`, Match>> {
  const path = `/seasons/${seasonID}/championships/${championshipID}/groups/${groupID}/teams/${teamID}/matches`;
  await set(ref(db, path), JSON.parse(JSON.stringify(matches)));

  return matches;
}
