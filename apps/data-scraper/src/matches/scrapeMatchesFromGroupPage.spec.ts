import type { Match } from '@einsatzplan/model/Match';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { FixtureFileLoader } from '../utils/FileLoader';
import { scrapeMatchesFromGroupPage } from './scrapeMatchesFromGroupPage';

describe('scrapeMatchesFromGroupPage', () => {
  let actual: Match[];
  const loader = new FixtureFileLoader({
    'groupPage.html': fixtureFile('group/MTTV 3. Liga Herren Gruppe 2 - click-TT – Gruppe.html'),
    'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?displayTyp=gesamt&displayDetail=meetings&championship=MTTV+24%2F25&group=214709':
      fixtureFile('group/MTTV 3. Liga Herren Gruppe 2 spielplan - gesamt - click-TT – Gruppe.html'),
  });


  beforeEach(async () => {
    actual = await scrapeMatchesFromGroupPage('groupPage.html', loader);
  });

  it('finds the correct sub-page and pares values from there', async () => {
    expect(actual[0])
      .toEqual(ensureProps<Match>({
        id: 'Match:Ittigen-vs-Tiefenau-group-214709',
        date: '2024-08-26',
        homeTeamId: 'Team:Ittigen',
        opponentTeamId: 'Team:Tiefenau',
        venueId: 'Venue:1',
        startTime: '19:45:00',
        flags: undefined,
      }));
  });
});
