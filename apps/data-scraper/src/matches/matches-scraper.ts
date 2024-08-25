import type { Database } from '@angular/fire/database';
import type { Match, MatchID } from '@einsatzplan/model/Match';
import type { TeamID } from '@einsatzplan/model/Team';
import { groupingBy } from '@einsatzplan/shared-util/list-util';
import { ref, set } from 'firebase/database';
import { parseMatchesFromIcs } from './parseMatchesFromIcs';

export async function scrapeMatches(path: string): Promise<Record<MatchID, Match>> {
  const matches = await parseMatchesFromIcs(path);
  const grouped = matches.reduce(groupingBy('id'), {});

  return grouped;
}

export async function uploadMatches(
  matches: Record<MatchID, Match>,
  championship: string,
  league: string,
  teamID: TeamID,
  db: Database,
): Promise<Record<`Match:${string}`, Match>> {
  const path = `/championships/${championship}/leagues/${league}/teams/${teamID}/matches`;
  await set(ref(db, path), JSON.parse(JSON.stringify(matches)));

  return matches;
}

