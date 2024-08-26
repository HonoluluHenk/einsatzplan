import { FixtureFileLoader } from '../utils/FileLoader';
import { scrapeMatchesPageUrlFromGroupPage } from './scrapeMatchesPageUrlFromGroupPage';

describe('scrapeMatchesPageUrlFromGroupPage', () => {
  let actual: string;
  const loader = new FixtureFileLoader({
    'groupPage.html': fixtureFile('group/MTTV 3. Liga Herren Gruppe 2 - click-TT – Gruppe.html'),
  });


  beforeEach(async () => {
    actual = await scrapeMatchesPageUrlFromGroupPage('groupPage.html', loader);
  });

  it('parses', async () => {
    expect(actual)
      .toEqual('https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?displayTyp=gesamt&displayDetail=meetings&championship=MTTV+24%2F25&group=214709');
  });
});
