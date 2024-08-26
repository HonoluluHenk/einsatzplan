import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { FixtureFileLoader } from '../utils/FileLoader';
import { type GroupIntermediate, scrapeGroupsFromLigenplan } from './scrapeGroupsFromLigenplan';

describe('scrapeGroupsFromLigenplan', () => {
  const loader = new FixtureFileLoader({
    'ligenplan-MTTV.html': fixtureFile('league/MTTV - click-TT – Ligen.html'),
  });

  let actual: GroupIntermediate[];

  beforeEach(async () => {
    actual = await scrapeGroupsFromLigenplan('ligenplan-MTTV.html', loader);
  });

  it('parses first', async () => {
    expect(actual[0])
      .toEqual(ensureProps<GroupIntermediate>({
        shortName: 'HE 1. Liga',
        clickTTUrl: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214704',
      }));
  });

  it('recognizes all entries in one column', async () => {
    expect(actual.slice(0, 3))
      .toEqual(ensureProps<GroupIntermediate[]>([
        {
          shortName: 'HE 1. Liga',
          clickTTUrl: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214704',
        },
        {
          shortName: 'HE 2. Liga Gr. 1',
          clickTTUrl: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214706',
        },
        {
          shortName: 'HE 2. Liga Gr. 2',
          clickTTUrl: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214705',
        },
      ]));
  });

  it('parses last entry and thus recognizes multiple columns', async () => {
    expect(actual)
      .toHaveLength(22);

    expect(actual[21])
      .toEqual(ensureProps<GroupIntermediate>({
        shortName: 'O50 1. Liga',
        clickTTUrl: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214770',
      }));
  });

});
