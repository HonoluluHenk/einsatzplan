import type { Database } from '@angular/fire/database';
import { scrapeTeams, uploadTeams } from './teams/teams-scraper';
import type { FileLoader } from './utils/FileLoader';

export async function teams(
  {championship, league, loader, db}: {
    championship: string,
    league: string,
    loader: FileLoader,
    db: Database
  },
): Promise<void> {
  try {
    const teams = await scrapeTeams(
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214709',
      loader,
    );
    await uploadTeams(teams, championship, league, db);
    console.log('teams saved:', Object.values(teams).length);


  } catch (error) {
    console.error('teams failed: ', error);
    throw Error('teams failed');
  }
}
