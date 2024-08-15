import type { Team } from '@einsatzplan/einsatzplan-lib/model';
import { parseID } from '@einsatzplan/einsatzplan-lib/types/ID.type';
import { ensureProps } from '@einsatzplan/einsatzplan-lib/util/ensure';
import { groupingBy } from '@einsatzplan/einsatzplan-lib/util/list-util';
import type { FileLoader } from '../utils/FileLoader';
import { parseTeamDetails } from './parseTeamDetails';
import { parseTeamHeaders } from './team-header';

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
    const teamDetailHTML = await loader.load(teamHeader.url);
    const teamDetail = await parseTeamDetails(teamDetailHTML);

    result.push(ensureProps<Team>({
      id: parseID('Team', teamHeader.name),
      name: teamHeader.name,
      shortName: teamHeader.name,
      venues: teamDetail.venues.reduce(groupingBy('id'), {}),
      contact: teamDetail.contact,
      defaultPlayers: [],
      url: teamHeader.url,
    }));
  }

  return result;
}
