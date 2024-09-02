import type { Championship } from '@einsatzplan/model/Championship';
import type { Group } from '@einsatzplan/model/GroupMasterData';
import type { Match } from '@einsatzplan/model/Match';
import type { Season } from '@einsatzplan/model/Season';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import { FixtureFileLoader } from '../utils/FileLoader';
import { scrapeMatchesFromGroupMatchesPage } from './scrapeMatchesFromGroupMatchesPage';

describe('scrapeMatchesFromGroupPage', () => {
  const season: Season = {
    id: parseID('Season', 'foo'),
    shortName: 'Season',
    longName: 'Season Long',
  };
  const championship: Championship = {
    id: parseID('Championship', 'foo'),
    shortName: 'Championship',
    longName: 'Championship Long',
  };
  const group: Group = {
    id: parseID('Group', 'foo'),
    shortName: 'Group',
    longName: 'Group Long',
  };

  let actual: Match[];
  const loader = new FixtureFileLoader({
    'MTTV-groupMatchesPage.html': fixtureFile('group/MTTV 3. Liga Herren Gruppe 2 spielplan - gesamt - click-TT – Gruppe.html'),
    'NWTTV-groupMatchesPage.html': fixtureFile('group/NWTTV 1. Liga Damen spielplan - gesamt - click-TT – Gruppe.html'),
  });

  describe('with MTTV fixtures', () => {
    beforeEach(async () => {
      actual = await scrapeMatchesFromGroupMatchesPage(
        season,
        championship,
        group,
        'MTTV-groupMatchesPage.html', loader);
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
          season,
          championship,
          group,
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
          season,
          championship,
          group,
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
          season,
          championship,
          group,
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
          season,
          championship,
          group,
        }));
    });
  });


  describe('with NWTTV fixtures', () => {
    beforeEach(async () => {
      actual = await scrapeMatchesFromGroupMatchesPage(
        season,
        championship,
        group,
        'NWTTV-groupMatchesPage.html', loader);
    });

    it('parses a pooled league/group', async () => {
      expect(actual[0])
        .toEqual(ensureProps<Match>({
          id: 'Match:Ostermundigen-vs-Birrfeld-group-214743',
          homeTeamId: 'Team:Ostermundigen',
          opponentTeamId: 'Team:Birrfeld',
          venueId: 'Venue:H',
          date: '2024-08-31',
          startTime: '13:00:00',
          flags: undefined,
          season,
          championship,
          group,
        }));

    });
  });
});
