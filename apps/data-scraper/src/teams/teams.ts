import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { GroupID } from '@einsatzplan/model/GroupMasterData';
import type { Team, TeamID } from '@einsatzplan/model/Team';
import type { ScraperContext } from '../ScraperContext';
import { scrapeTeams } from './scrapeTeams';
import { uploadTeams } from './uploadTeams';

export async function teams(
  context: ScraperContext,
  opts: {
    championshipID: ChampionshipID,
    groupID: GroupID,
  },
): Promise<Record<TeamID, Team>> {
  try {
    const teams = await scrapeTeams(
      'https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214709',
      context.loader,
    );

    await uploadTeams(context.season.id, teams, opts.championshipID, opts.groupID, context.db);

    console.log('teams saved:', Object.values(teams).length);

    return teams;

  } catch (error) {
    console.error('teams failed: ', error);
    throw Error('teams failed');
  }
}
