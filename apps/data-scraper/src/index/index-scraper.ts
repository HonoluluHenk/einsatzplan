import type { Name } from '@einsatzplan/model/Name';
import type { Season } from '@einsatzplan/model/Season';
import type { FileLoader } from '../utils/FileLoader';
import type { ChampionshipLink } from './ChampionshipLink';
import { parseChampionshipsFromHTML } from './parseChampionshipsFromHTML';

export async function scrapeIndexForChampionships(
  url: string,
  season: Season,
  associations: Name[],
  loader: FileLoader,
): Promise<ChampionshipLink[]> {
  return await parseChampionshipsFromHTML({
    url,
    season,
    associations,
    loader,
  });
}
