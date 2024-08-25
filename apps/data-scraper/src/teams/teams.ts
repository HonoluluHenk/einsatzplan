import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { LeagueID } from '@einsatzplan/model/League';
import type { ScraperContext } from '../ScraperContext';
import { scrapeTeams } from './scrapeTeams';
import { uploadTeams } from './uploadTeams';

export async function teams(
  context: ScraperContext,
  opts: {
    championshipID: ChampionshipID,
    leagueID: LeagueID,
  },
): Promise<void> {
  try {
    const teams = await scrapeTeams(
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214709',
      context.loader,
    );

    await uploadTeams(context.season.id, teams, opts.championshipID, opts.leagueID, context.db);

    console.log('teams saved:', Object.values(teams).length);
  } catch (error) {
    console.error('teams failed: ', error);
    throw Error('teams failed');
  }
}
