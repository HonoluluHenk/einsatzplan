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

  it('parses all fields correctly', async () => {
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

  it('parses an entry with "v" flag', async () => {
    expect(actual[2])
      .toEqual(ensureProps<Match>({
        id: 'Match:Ittigen-vs-Burgdorf VI-group-214709',
        date: '2024-09-02',
        homeTeamId: 'Team:Ittigen',
        opponentTeamId: 'Team:Burgdorf VI',
        venueId: 'Venue:1',
        startTime: '19:45:00',
        flags: 'v',
      }));
  });

  it('parses all entries', async () => {
    expect(actual.length)
      .toBe(56);
  });

  it('parses up until the last entry', async () => {
    expect(actual[55])
      .toEqual(ensureProps<Match>({
        id: 'Match:Münchenbuchsee II-vs-Tiefenau-group-214709',
        date: '2025-04-02',
        homeTeamId: 'Team:Münchenbuchsee II',
        opponentTeamId: 'Team:Tiefenau',
        venueId: 'Venue:1',
        startTime: '20:00:00',
        flags: undefined,
      }));
  });

  it('parses an entry with differing venue', async () => {
    expect(actual[5])
      .toEqual(ensureProps<Match>({
        id: 'Match:Bern IV-vs-Ittigen-group-214709',
        date: '2024-09-12',
        homeTeamId: 'Team:Bern IV',
        opponentTeamId: 'Team:Ittigen',
        venueId: 'Venue:2',
        startTime: '20:00:00',
        flags: undefined,
      }));
  });

});
