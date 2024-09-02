import type { Championship } from '@einsatzplan/model/Championship';
import type { GroupMasterData } from '@einsatzplan/model/GroupMasterData';
import type { Season } from '@einsatzplan/model/Season';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import { FixtureFileLoader } from '../utils/FileLoader';
import { scrapeGroupFromGroupPage } from './scrapeGroupFromGroupPage';
import type { GroupIntermediate } from './scrapeGroupIntermediatesFromLigenplan';

describe('scrapeGroupFromGroupPage', () => {
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
  const loader = new FixtureFileLoader({
    'gruppe.html': fixtureFile('group/MTTV 3. Liga Herren Gruppe 2 - click-TT – Gruppe.html'),
  });

  let actual: GroupMasterData;

  beforeEach(async () => {
    const intermediate: GroupIntermediate = {
      shortName: 'HE 3. Liga Gr. 2',
      clickTTUrl: 'gruppe.html',
    };
    actual = await scrapeGroupFromGroupPage(intermediate, season, championship, loader);
  });

  it('parses', async () => {
    expect(actual)
      .toEqual(ensureProps<GroupMasterData>({
        id: parseID('Group', 'HE 3. Liga Gr. 2'),
        longName: '3. Liga Herren Gruppe 2',
        shortName: 'HE 3. Liga Gr. 2',
        clickTTUrl: 'gruppe.html',
        system: 'STT-Spielsystem',
        season,
        championship,
      }));
  });
});
