import type { Match } from '@einsatzplan/model/Match';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { FixtureFileLoader } from '../utils/FileLoader';
import { scrapeMatchesFromGroupMatchesPage } from './scrapeMatchesFromGroupMatchesPage';

describe('scrapeMatchesFromGroupPage', () => {
  let actual: Match[];
  const loader = new FixtureFileLoader({
    'groupMatchesPage.html': fixtureFile('group/MTTV 3. Liga Herren Gruppe 2 spielplan - gesamt - click-TT – Gruppe.html'),
  });


  beforeEach(async () => {
    actual = await scrapeMatchesFromGroupMatchesPage('groupMatchesPage.html', loader);
  });

  it('parses first', async () => {
    expect(actual[0])
      .toEqual(ensureProps<Match>({
        id: 'Match:Ittigen-vs-Tiefenau',
        date: '2024-08-26',
        homeTeamId: 'Team:Ittigen',
        opponentTeamId: 'Team:Tiefenau',
        venueId: 'Venue:1',
        startTime: '19:45:00',
        flags: undefined,
      }));
  });
});
