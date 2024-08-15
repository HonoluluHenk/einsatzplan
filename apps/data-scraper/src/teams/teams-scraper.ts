import type { Database } from '@angular/fire/database';
import type { Team, TeamID } from '@einsatzplan/einsatzplan-lib/model';
import { groupingBy } from '@einsatzplan/einsatzplan-lib/util/list-util';
import type { FileLoader } from '../utils/FileLoader';
import { parseTeamsFromHTML } from './parseTeamsFromHTML';

// league URL, e.g.:
// https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214709
export async function scrapeTeams(
  leagueURL: string,
  loader: FileLoader,
): Promise<Record<TeamID, Team>> {
  const html = await loader.load(leagueURL);

  const teams = await parseTeamsFromHTML(html, loader);

  const result: Record<TeamID, Team> = teams.reduce(groupingBy('id'), {});

  return result;
}

export async function uploadTeams(
  teams: Record<TeamID, Team>,
  championship: string,
  league: string,
  db: Database,
): Promise<void> {
  const path = `championships/${championship}/leagues/${league}/teams`;

  console.error('Not implemented yet: uploadTeams');
}
