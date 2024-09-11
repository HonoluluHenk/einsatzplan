import { type Database } from '@angular/fire/database';
import type { Match } from '@einsatzplan/model/Match';
import type { TeamID } from '@einsatzplan/model/Team';
import { ref, set } from 'firebase/database';
import { withTracing } from '../utils/withTracing';

export async function uploadMatches(
  matches: Match[],
  db: Database,
): Promise<void> {
  const PQueue = await import('p-queue');
  const queue = new PQueue.default({throwOnTimeout: true, concurrency: 20});


  await queue.addAll(matches.map(match => async () => {
    await withTracing(`uploadMatches (${match.id})`, async () => {
      async function uploadForTeam(teamID: TeamID): Promise<void> {
        const path = `/seasons/${match.season.id}/championships/${match.championship.id}/groups/${match.group.id}/teams/${teamID}/matches/${match.id}`;
        await set(ref(db, path), JSON.parse(JSON.stringify(match)));
      }

      try {
        await uploadForTeam(match.homeTeamId);
        await uploadForTeam(match.opponentTeamId);
      } catch (e) {
        console.log('match', match);
        throw e;
      }
    });
  }));
}
