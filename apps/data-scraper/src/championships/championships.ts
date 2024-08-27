import { scrapeIndexForChampionships } from '../index/index-scraper';
import type { ScraperContext } from '../ScraperContext';
import { scrapeChampionshipDetails } from './scrapeChampionshipDetails';
import { uploadChampionship } from './uploadChampionship';

export async function championships(
  context: ScraperContext,
): Promise<void> {
  try {
    const championshipLinks = await scrapeIndexForChampionships(
      'https://www.click-tt.ch/index.htm.de',
      context.season,
      context.associations,
      context.loader,
    );

    const masterDataTasks = championshipLinks.map(link => scrapeChampionshipDetails(link, context.loader));
    const masterData = await Promise.all(masterDataTasks);

    for (const championship of masterData) {
      await uploadChampionship(
        championship,
        context.db,
      );
    }

    console.log('championships saved:', Object.values(championshipLinks).length);


  } catch (error) {
    console.error('championships failed: ', error);
    throw Error('championships failed');
  }
}
