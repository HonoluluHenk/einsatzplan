import type { Match, MatchID } from '@einsatzplan/model/Match';
import { groupingBy } from '@einsatzplan/shared-util/list-util';
import { parseMatchesFromIcs } from './parseMatchesFromIcs';

export async function scrapeMatches(path: string): Promise<Record<MatchID, Match>> {
  const matches = await parseMatchesFromIcs(path);
  const grouped = matches.reduce(groupingBy('id'), {});

  return grouped;
}

