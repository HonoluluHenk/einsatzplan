import type { Team, TeamID } from '@einsatzplan/model/Team';
import { groupingBy } from '@einsatzplan/shared-util/list-util';
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

