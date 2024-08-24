import type { AssociationName } from '@einsatzplan/einsatzplan-lib/model/Association';
import type { Season } from '@einsatzplan/einsatzplan-lib/model/Season';
import type { FileLoader } from '../utils/FileLoader';
import type { ChampionshipLink } from './ChampionshipLink';
import { parseChampionshipsFromHTML } from './parseChampionshipsFromHTML';

export async function scrapeIndexForChampionships(
  url: string,
  season: Season,
  associations: AssociationName[],
  loader: FileLoader,
): Promise<ChampionshipLink[]> {
  return await parseChampionshipsFromHTML({
    url,
    season,
    associations,
    loader,
  });
}
