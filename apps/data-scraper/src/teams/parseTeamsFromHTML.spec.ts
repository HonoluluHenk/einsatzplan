import type { Team } from '@einsatzplan/model/Team';
import type { VenueMasterData } from '@einsatzplan/model/Venue';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import { FixtureFileLoader } from '../utils/FileLoader';
import { parseTeamsFromHTML } from './parseTeamsFromHTML';

describe('parseTeamsFromHTML', () => {
  //let content: string;
  let actual: Team[];

  const loader = new FixtureFileLoader(new Map<string, string>([
    ['click-TT – Gruppe.html', fixtureFile('league/teams/click-TT – Gruppe.html')],
    [
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/teamPortrait?teamtable=1708456&championship=MTTV+24%2F25&group=214709',
      fixtureFile('league/teams/click-TT – Mannschaftsportrait-Ostermundigen III.html'),
    ],
    [
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/teamPortrait?teamtable=1708744&championship=MTTV+24%2F25&group=214709',
      fixtureFile('league/teams/click-TT – Mannschaftsportrait-Ittigen.html'),
    ],
    [
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/teamPortrait?teamtable=1708454&championship=MTTV+24%2F25&group=214709',
      fixtureFile('league/teams/click-TT – Mannschaftsportrait-Burgdorf VI.html'),
    ],
    [
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/teamPortrait?teamtable=1708749&championship=MTTV+24%2F25&group=214709',
      fixtureFile('league/teams/click-TT – Mannschaftsportrait-Wohlensee.html'),
    ],
    [
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/teamPortrait?teamtable=1708735&championship=MTTV+24%2F25&group=214709',
      fixtureFile('league/teams/click-TT – Mannschaftsportrait-Tiefenau.html'),
    ],
    [
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/teamPortrait?teamtable=1708761&championship=MTTV+24%2F25&group=214709',
      fixtureFile('league/teams/click-TT – Mannschaftsportrait-Münchenbuchsee II.html'),
    ],
    [
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/teamPortrait?teamtable=1708756&championship=MTTV+24%2F25&group=214709',
      fixtureFile('league/teams/click-TT – Mannschaftsportrait-Kirchberg II.html'),
    ],
    [
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/teamPortrait?teamtable=1708732&championship=MTTV+24%2F25&group=214709',
      fixtureFile('league/teams/click-TT – Mannschaftsportrait-Bern IV.html'),
    ],
  ]));

  beforeEach(async () => {
    //content = fs.readFileSync(fixtureFile('league/teams/click-TT – Gruppe.html'), 'utf8');

    // sanity check
    //expect(content)
    //  .not.toBe('');

    actual = await parseTeamsFromHTML('click-TT – Gruppe.html', loader);
  });

  it('parses the HTML table into an array containing all fields', async () => {
    const om3 = actual[0];

    expect(om3)
      .toEqual(ensureProps<Team>({
        id: parseID('Team', 'Ostermundigen III'),
        name: 'Ostermundigen III',
        shortName: 'Ostermundigen III',
        venues: {
          'Venue:1': ensureProps<VenueMasterData>({
            id: 'Venue:1',
            number: 1,
            name: 'Turnhalle orange, UG, Schule Dennigkofen',
            address: {
              street: 'Dennigkofenweg 169',
              zip: '3072',
              city: 'Ostermundigen',
            },
          }),
        },
        contact: {
          name: {
            displayedName: 'Christoph Linder',
            displayedNameFormal: 'Linder, Christoph',
            displayedNameShort: 'Christoph L.',
            givenName: 'Christoph',
            familyName: 'Linder',
          },
          phone: '078 774 09 37',
          email: 'post@christoph-linder.ch',
        },
        url: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/teamPortrait?teamtable=1708456&championship=MTTV+24%2F25&group=214709',
      }));
  });

  it('parses all teams', async () => {
    expect(actual.map((team) => team.name))
      .toEqual([
        'Ostermundigen III',
        'Ittigen',
        'Burgdorf VI',
        'Wohlensee',
        'Tiefenau',
        'Münchenbuchsee II',
        'Kirchberg II',
        'Bern IV',
      ]);
  });
});
