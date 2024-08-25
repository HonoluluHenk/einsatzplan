import type { Database } from '@angular/fire/database';
import { parseFromName } from '@einsatzplan/model/Season';
import type PQueue from 'p-queue';
import { scrapeChampionshipDetails } from './championships/scrapeChampionshipDetails';
import { uploadChampionship } from './championships/uploadChampionship';
import type { Config } from './config';
import { scrapeIndexForChampionships } from './index/index-scraper';
import type { FileLoader } from './utils/FileLoader';

export async function championships(
  opts: {
    config: Config
    queue: PQueue,
    loader: FileLoader,
    db: Database
  },
): Promise<void> {
  try {
    const championshipLinks = await scrapeIndexForChampionships(
      'https://www.click-tt.ch/index.htm.de',
      parseFromName(opts.config.season),
      opts.config.associations,
      opts.loader,
    );

    const masterDataTasks = championshipLinks.map(link => async () => await scrapeChampionshipDetails(link, opts.loader));
    const masterData = await opts.queue.addAll(masterDataTasks);

    for (const championship of masterData) {
      await uploadChampionship(
        championship,
        opts.db,
      );
    }

    console.log('championships saved:', Object.values(championshipLinks).length);


  } catch (error) {
    console.error('championships failed: ', error);
    throw Error('championships failed');
  }
}
