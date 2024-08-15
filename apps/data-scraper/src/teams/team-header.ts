import * as cheerio from 'cheerio';
import { type Cheerio } from 'cheerio';
import type { Element } from 'domhandler';
import type { FileLoader } from '../utils/FileLoader';

export type TeamHeader = {
  name: string;
  url: string;
}

export async function parseTeamHeaders(
  html: string,
  loader: FileLoader,
): Promise<TeamHeader[]> {
  try {
    const $ = cheerio.load(html);

    const teamsTable = $('h2:contains("Tabelle")').next('table.result-set');

    const teamsTableRowsWithoutHeading = $('tbody tr', teamsTable).slice(1);

    const parsed = teamsTableRowsWithoutHeading
      .map((
        _,
        row,
      ) => {
        const teamHeaderCol = cheerio.load(row)('td:nth-child(3)');
        const teamHeader = parseTeamHeaderFromTD(teamHeaderCol, loader);

        return teamHeader;
      })
      .toArray();

    return parsed;

  } catch (error) {
    throw new Error(`Failed to parse team headers: ${error}, html: ${html}`);
  }

}

/**
 * Parses the structure `<td><a href="https://link.to/team-page">TeamName</a></td>`
 */
function parseTeamHeaderFromTD(
  teamColTD: Cheerio<Element>,
  loader: FileLoader,
): TeamHeader {
  const anchor = teamColTD.children('a');

  return {
    name: anchor.text().trim(),
    url: loader.prependBaseURL(anchor.attr('href') ?? ''),
  };
}
