import type { Match } from '@einsatzplan/model/Match';
import type { FileLoader } from '../utils/FileLoader';
import { scrapeMatchesFromGroupMatchesPage } from './scrapeMatchesFromGroupMatchesPage';
import { scrapeMatchesPageUrlFromGroupPage } from './scrapeMatchesPageUrlFromGroupPage';

export async function scrapeMatchesFromGroupPage(
  groupPageUrl: string,
  loader: FileLoader,
): Promise<Match[]> {
  const matchesPageUrl = await scrapeMatchesPageUrlFromGroupPage(groupPageUrl, loader);

  const matches = await scrapeMatchesFromGroupMatchesPage(matchesPageUrl, loader);

  return matches;
}
