import type { Database } from '@angular/fire/database';
import { parseFromName } from '@einsatzplan/einsatzplan-lib/model/Season';
import type { Config } from './assets/config';
import { uploadChampionship } from './championships/uploadChampionship';
import { scrapeIndexForChampionships } from './index/index-scraper';
import type { FileLoader } from './utils/FileLoader';

export async function championships(
  opts: {
    config: Config
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

    for (const championship of championshipLinks) {
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
