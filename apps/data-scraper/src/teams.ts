import type { Database } from '@angular/fire/database';
import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { LeagueID } from '@einsatzplan/model/League';
import type { SeasonID } from '@einsatzplan/model/Season';
import { scrapeTeams } from './teams/scrapeTeams';
import { uploadTeams } from './teams/uploadTeams';
import type { FileLoader } from './utils/FileLoader';

export async function teams(
  opts: {
    seasonID: SeasonID,
    championshipID: ChampionshipID,
    leagueID: LeagueID,
    loader: FileLoader,
    db: Database
  },
): Promise<void> {
  try {
    const teams = await scrapeTeams(
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214709',
      opts.loader,
    );
    await uploadTeams(opts.seasonID, teams, opts.championshipID, opts.leagueID, opts.db);
    console.log('teams saved:', Object.values(teams).length);


  } catch (error) {
    console.error('teams failed: ', error);
    throw Error('teams failed');
  }
}
