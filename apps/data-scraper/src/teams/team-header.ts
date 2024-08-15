import * as cheerio from 'cheerio';
import { type Cheerio } from 'cheerio';
import type { Element } from 'domhandler';
import type { FileLoader } from '../utils/FileLoader';

type TeamHeader = {
  name: string;
  url: string;
}

export async function parseTeamHeaders(
  html: string,
  loader: FileLoader,
): Promise<TeamHeader[]> {
  const $ = cheerio.load(html);

  const teamsTable = $('h2:contains("Tabelle")').next('table.result-set');

  const teamsTableRowsWithoutHeading = $('tbody tr', teamsTable).slice(1);

  const parsed = teamsTableRowsWithoutHeading
    .map((
      _,
      row,
    ) => {
      const teamHeaderCol = cheerio.load(row)('td:nth-child(3)');
      const teamHeader = parseTeamHeaderFromTD(teamHeaderCol);

      return teamHeader;
    })
    .toArray();

  parsed.forEach(p => loader.load(p.url));

  return parsed;

}

/**
 * Parses the structure `<td><a href="https://link.to/team-page">TeamName</a></td>`
 */
function parseTeamHeaderFromTD(teamColTD: Cheerio<Element>): TeamHeader {
  const anchor = teamColTD.children('a');

  return {
    name: anchor.text().trim(),
    url: anchor.attr('href') ?? '',
  };
}
