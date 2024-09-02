import type { Association, AssociationName } from '@einsatzplan/model/Association';
import type { ChampionshipName } from '@einsatzplan/model/Championship';
import type { Season } from '@einsatzplan/model/Season';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { cleanPathForFirebaseKey } from '@einsatzplan/shared-util/firebase-util';
import { requireValue } from '@einsatzplan/shared-util/nullish';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import type { FileLoader } from '../utils/FileLoader';
import { loadCheerio } from '../utils/loadCheerio';
import type { ChampionshipLink } from './ChampionshipLink';

export async function parseChampionshipsFromHTML(
  opts: {
    url: string,
    season: Season,
    associations: AssociationName[],
    loader: FileLoader
  },
): Promise<ChampionshipLink[]> {
  const result: ChampionshipLink[] = [];

  const wantedChampionShipsByTitle: Record<string, ChampionshipName> = opts.associations.reduce((
      acc,
      next,
    ) => addChampionship(acc, next, opts.season),
    {} as Record<string, Association>);

  const html = await opts.loader.load(opts.url);

  const $ = loadCheerio(html);
  const assocHrefs = $('#navigation ul li ul li a');

  for (const a of assocHrefs) {
    const header = $(a)
      .text();
    const href = requireValue($(a)
      .attr('href'), `Link not found for association: ${header}`);

    const wantedChampionship = wantedChampionShipsByTitle[header];
    if (!wantedChampionship) {
      continue;
    }

    result.push(ensureProps<ChampionshipLink>({
      id: parseID('Championship', `${wantedChampionship.shortName} ${opts.season.shortName}`),
      shortName: `${wantedChampionship.shortName} ${opts.season.longName}`,
      url: opts.loader.prependBaseURL(href),
      season: opts.season,
    }));
  }


  return result;
}

function addChampionship(
  acc: Record<string, Association>,
  next: AssociationName,
  championship: ChampionshipName,
): Record<string, Association> {
  const assoc = ensureProps<Association>({
    id: parseID('Association', cleanPathForFirebaseKey(next.shortName)),
    shortName: next.shortName,
    longName: next.longName,
  });

  const shortHeader = `${next.shortName} ${championship.longName}`;
  const longHeader = `${next.longName} ${championship.longName}`;

  return {
    ...acc,
    [shortHeader]: assoc,
    [longHeader]: assoc,
  };
}
