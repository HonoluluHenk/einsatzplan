import type { ChampionshipMasterData } from '@einsatzplan/model/Championship';
import * as cheerio from 'cheerio';
import type { ChampionshipLink } from '../index/ChampionshipLink';
import type { FileLoader } from '../utils/FileLoader';

export async function scrapeChampionshipDetails(
  link: ChampionshipLink,
  loader: FileLoader,
): Promise<ChampionshipMasterData> {
  const html = await loader.load(link.url);

  const $ = cheerio.load(html);

  const longName = $('#content #content-col1 h1')
    .text()
    .trim()
    .replace(/\n.*/g, '')
    .trim();

  return {
    id: link.id,
    shortName: link.shortName,
    season: link.season,
    clickTTLigenplanUrl: link.url,
    longName,
  };
}
