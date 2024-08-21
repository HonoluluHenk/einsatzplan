import type { Database } from '@angular/fire/database';
import type { Team, TeamID } from '@einsatzplan/einsatzplan-lib/model';
import { groupingBy } from '@einsatzplan/einsatzplan-lib/util/list-util';
import * as firebaseDB from 'firebase/database';
import { ref } from 'firebase/database';
import type { FileLoader } from '../utils/FileLoader';
import { parseTeamsFromHTML } from './parseTeamsFromHTML';

// league URL, e.g.:
// https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214709
export async function scrapeTeams(
  leagueURL: string,
  loader: FileLoader,
): Promise<Record<TeamID, Team>> {
  const teams = await parseTeamsFromHTML(leagueURL, loader);

  const result: Record<TeamID, Team> = teams.reduce(groupingBy('id'), {});

  return result;
}

export async function uploadTeams(
  teams: Record<TeamID, Team>,
  championship: string,
  league: string,
  db: Database,
): Promise<Record<TeamID, Team>> {
  for (const [id, team] of Object.entries(teams)) {
    const path = `championships/${championship}/leagues/${league}/teams/${id}/teamMasterData`;
    await firebaseDB.set(ref(db, path), JSON.parse(JSON.stringify(team)));
  }

  return teams;
}
