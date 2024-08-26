import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { requireValue } from '@einsatzplan/shared-util/nullish';
import * as cheerio from 'cheerio';
import type { FileLoader } from '../utils/FileLoader';

export type GroupIntermediate = {
  shortName: string;
  clickTTUrl: string;
};

export async function scrapeGroupsFromLigenplan(
  url: string,
  loader: FileLoader,
): Promise<GroupIntermediate[]> {
  const html = await loader.load(url);

  const $ = cheerio.load(html);

  const groupAnchors = $('#content table.matrix tr td ul li a')
    .toArray();

  const groups = groupAnchors
    .map(groupAnchor => {
      const shortName = $(groupAnchor)
        .text()
        .trim();

      const href = requireValue($(groupAnchor)
        .attr('href'), `href not found for anchor: ${shortName}`);
      const clickTTUrl = loader.prependBaseURL(href);

      return ensureProps<GroupIntermediate>({
        shortName,
        clickTTUrl,
      });
    });

  return groups;
}
