import type { Name } from '@einsatzplan/model/Name';
import type { Season } from '@einsatzplan/model/Season';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { FixtureFileLoader } from '../utils/FileLoader';
import type { ChampionshipLink } from './ChampionshipLink';
import { parseChampionshipsFromHTML } from './parseChampionshipsFromHTML';

describe('parseChampionshipsFromHTML', () => {
  let actual: ChampionshipLink[];

  const loader = new FixtureFileLoader(new Map<string, string>([
    ['https://www.click-tt.ch/index.htm.de', fixtureFile('index/click-tt.ch - Swiss Table Tennis.html')],
  ]));

  const url = 'https://www.click-tt.ch/index.htm.de';
  const season: Season = {id: 'Season:24_25', shortName: '24/25', longName: '2024/25'};
  const associations: Name[] = [
    {shortName: 'STT', longName: 'Nationalliga'},
    {shortName: 'MTTV', longName: 'Mittelländischer Tischtennisverband'},
    {shortName: 'NWTTV', longName: 'Nordwestschweizerischer Tischtennisverband'},
  ];

  beforeEach(async () => {
    actual = await parseChampionshipsFromHTML({url, season, associations, loader});
  });

  it('parses the HTML table into an array containing all fields', async () => {
    expect(actual)
      .toBeInstanceOf(Array);

    expect(actual[0])
      .toEqual(ensureProps<ChampionshipLink>({
        id: 'Championship:STT 24_25',
        shortName: 'STT 2024/25',
        url: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/leaguePage?championship=STT+24/25&preferredLanguage=German',
        season: {id: 'Season:24_25', shortName: '24/25', longName: '2024/25'},
      }));
  });

  it('parses all teams', async () => {
    expect(actual.map((assoc) => assoc.shortName))
      .toEqual([
        'STT 2024/25',
        //'AGTT 2024/25',
        //'ANJTT 2024/25',
        //'ATTT 2024/25',
        //'AVVF 2024/25',
        'MTTV 2024/25',
        'NWTTV 2024/25',
        //'OTTV 2024/25',
        //'TTVI 2024/25',
      ]);
  });
});
