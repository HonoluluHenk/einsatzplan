import type { Database } from '@angular/fire/database';
import type { Match, MatchID } from '@einsatzplan/einsatzplan-lib/model';
import { groupingBy } from '@einsatzplan/einsatzplan-lib/util/list-util';
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
  team: string,
  db: Database,
): Promise<Record<`Match:${string}`, Match>> {
  const path = `/championship/${championship}/leagues/${league}/teams/${team}/matches`;
  await set(ref(db, path), JSON.parse(JSON.stringify(matches)));

  return matches;
}

