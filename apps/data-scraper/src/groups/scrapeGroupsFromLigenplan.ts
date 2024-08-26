import { requireValue } from '@einsatzplan/shared-util/nullish';
import * as cheerio from 'cheerio';
import type { FileLoader } from '../utils/FileLoader';

export type FooResult = {
  name: string;
  url: string;
};

export async function scrapeGroupsFromLigenplan(
  url: string,
  loader: FileLoader,
): Promise<FooResult[]> {
  const html = await loader.load(url);

  const $ = cheerio.load(html);

  const groupAnchors = $('#content table.matrix tr td ul li a')
    .toArray();

  const groups = groupAnchors
    .map(groupAnchor => {
      const name = $(groupAnchor)
        .text()
        .trim();

      const href = requireValue($(groupAnchor)
        .attr('href'), `href not found for anchor: ${name}`);
      const url = loader.prependBaseURL(href);

      return {
        name,
        url,
      };
    });

  return groups;
}
