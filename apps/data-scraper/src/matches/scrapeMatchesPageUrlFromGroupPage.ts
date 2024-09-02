import { requireValue } from '@einsatzplan/shared-util/nullish';
import type { FileLoader } from '../utils/FileLoader';
import { loadCheerio } from '../utils/loadCheerio';
import { withTracing } from '../utils/withTracing';

export async function scrapeMatchesPageUrlFromGroupPage(
  groupPageUrl: string,
  loader: FileLoader,
): Promise<string> {
  return withTracing('scrapeMatchesPageUrlFromGroupPage', async () => {
    const html = await loader.load(groupPageUrl);

    const $ = loadCheerio(html);

    const li = $('#content #content-col2 #sub-navigation li')
      .toArray();

    const spielplan = li.find(li =>
      {
        const text: string = $(li)
          .text();
        return text
          .match(/Spielplan.*VR.+RR/s);
      },
    );

    requireValue(spielplan, `Spielplan entry not found in ${groupPageUrl}`);

    const href = $('a:contains("gesamt")', spielplan)
      .attr('href');

    const result = loader.prependBaseURL(requireValue(href, `href not found for Spielplan entry in ${groupPageUrl}`));

    return result;
  });
}
