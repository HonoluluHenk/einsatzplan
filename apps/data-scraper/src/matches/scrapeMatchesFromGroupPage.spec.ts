import type { Championship } from '@einsatzplan/model/Championship';
import type { Group } from '@einsatzplan/model/GroupMasterData';
import type { Match } from '@einsatzplan/model/Match';
import type { Season } from '@einsatzplan/model/Season';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import { FixtureFileLoader } from '../utils/FileLoader';
import { scrapeMatchesFromGroupPage } from './scrapeMatchesFromGroupPage';

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
    'groupPage.html': fixtureFile('group/MTTV 3. Liga Herren Gruppe 2 - click-TT – Gruppe.html'),
    'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?displayTyp=gesamt&displayDetail=meetings&championship=MTTV+24%2F25&group=214709':
      fixtureFile('group/MTTV 3. Liga Herren Gruppe 2 spielplan - gesamt - click-TT – Gruppe.html'),
  });


  beforeEach(async () => {
    actual = await scrapeMatchesFromGroupPage(season, championship, group, 'groupPage.html', loader);
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
        season,
        championship,
        group,
      }));
  });
});
