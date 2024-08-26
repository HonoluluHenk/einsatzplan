import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { FixtureFileLoader } from '../utils/FileLoader';
import { type FooResult, scrapeGroupsFromLigenplan } from './scrapeGroupsFromLigenplan';

describe('scrapeGroupsFromLigenplan', () => {
  const loader = new FixtureFileLoader({
    'ligenplan-MTTV.html': fixtureFile('league/MTTV - click-TT – Ligen.html'),
  });

  let actual: FooResult[];

  beforeEach(async () => {
    actual = await scrapeGroupsFromLigenplan('ligenplan-MTTV.html', loader);
  });

  it('parses first', async () => {
    expect(actual[0])
      .toEqual(ensureProps<FooResult>({
        name: 'HE 1. Liga',
        url: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214704',
      }));
  });

  it('recognizes all entries in one column', async () => {
    expect(actual.slice(0, 3))
      .toEqual(ensureProps<FooResult[]>([
        {
          name: 'HE 1. Liga',
          url: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214704',
        },
        {
          name: 'HE 2. Liga Gr. 1',
          url: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214706',
        },
        {
          name: 'HE 2. Liga Gr. 2',
          url: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214705',
        },
      ]));
  });

  it('parses last entry and thus recognizes multiple columns', async () => {
    expect(actual)
      .toHaveLength(22);

    expect(actual[21])
      .toEqual(ensureProps<FooResult>({
        name: 'O50 1. Liga',
        url: 'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214770',
      }));
  });

});
