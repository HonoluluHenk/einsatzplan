import type { ChampionshipMasterData } from '@einsatzplan/model/Championship';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import type { ChampionshipLink } from '../index/ChampionshipLink';
import { FixtureFileLoader } from '../utils/FileLoader';
import { scrapeChampionshipDetails } from './scrapeChampionshipDetails';

describe('parseChampionshipsFromHTML', () => {
  let actual: ChampionshipMasterData;

  const loader = new FixtureFileLoader(new Map<string, string>([
    ['foo.html', fixtureFile('championships/MTTV 24_25 click-TT – Ligen.html')],
  ]));


  const link: ChampionshipLink = {
    id: 'Championship:MTTV 24_25',
    shortName: 'MTTV 2024/25',
    url: 'foo.html',
    season: {id: 'Season:24_25', shortName: '24/25', longName: '2024/25'},
  };

  beforeEach(async () => {
    actual = await scrapeChampionshipDetails(link, loader);

  });

  it('parses', async () => {
    expect(actual)
      .toEqual(ensureProps<ChampionshipMasterData>({
        id: 'Championship:MTTV 24_25',
        shortName: 'MTTV 2024/25',
        externalUrl: 'foo.html',
        longName: 'MTTV Mannschaftsmeisterschaft 2024/25',
        season: {id: 'Season:24_25', shortName: '24/25', longName: '2024/25'},
      }));

  });

});
