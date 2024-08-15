import type { Team } from '@einsatzplan/einsatzplan-lib/model';
import { parseID } from '@einsatzplan/einsatzplan-lib/types/ID.type';
import { ensureProps } from '@einsatzplan/einsatzplan-lib/util/ensure';
import { groupingBy } from '@einsatzplan/einsatzplan-lib/util/list-util';
import type { FileLoader } from '../utils/FileLoader';
import { parseTeamDetails, type TeamDetail } from './parseTeamDetails';
import { parseTeamHeaders, type TeamHeader } from './team-header';

/**
 *
 * @param url Content of e.g. "click-TT – Gruppe.html" or <a
 *   href="https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214709">Click-TT
 *   Gruppe</a>
 * @param loader used to load child-HTML files (e.g. team detail pages)
 */
export async function parseTeamsFromHTML(
  url: string,
  loader: FileLoader,
): Promise<Team[]> {
  const html = await loader.load(url);

  const teamHeaders = await parseTeamHeaders(html, loader);

  const result: Team[] = [];

  for (const teamHeader of teamHeaders) {
    const teamDetail = await parseTeamDetailsFromHTML(loader, teamHeader, html);

    const team = toTeam(teamHeader, teamDetail);

    result.push(team);
  }

  return result;
}

function toTeam(
  teamHeader: TeamHeader,
  teamDetail: TeamDetail,
): Team {
  return ensureProps<Team>({
    id: parseID('Team', teamHeader.name),
    name: teamHeader.name,
    shortName: teamHeader.name,
    venues: teamDetail.venues.reduce(groupingBy('id'), {}),
    contact: teamDetail.contact,
    url: teamHeader.url,
  });
}

async function parseTeamDetailsFromHTML(
  loader: FileLoader,
  teamHeader: TeamHeader,
  html: string,
): Promise<TeamDetail> {
  const teamDetailHTML = await loader.load(teamHeader.url);
  try {
    const result = await parseTeamDetails(teamDetailHTML);
    return result;

  } catch (error) {
    throw new Error(`Failed to parse team details: ${error}, url: ${teamHeader.url}, html: ${html}`);
  }
}
