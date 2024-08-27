import { parseID } from '@einsatzplan/shared-util/types/ID.type';

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// eslint-disable-next-line @nx/enforce-module-boundaries
import firebaseConfig from '../../../developer-local-settings/config/firebase-client.json';
import { championships } from './championships/championships';
import { config } from './config';
import { matches } from './matches/matches';
import { players } from './players/players';
import { ScraperContext } from './ScraperContext';
import { Task } from './Task';
import { teams } from './teams/teams';
import { FetchFileLoader } from './utils/FileLoader';


const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);


const championshipID = parseID('Championship', 'MTTV 24/25');
const leagueID = parseID('League', 'HE 3. Liga Gr. 3');
const teamID = parseID('Team', 'Ostermundigen III');

(async () => {
  const PQueue = await import('p-queue');
  const queue = new PQueue.default({concurrency: 2});
  const loader = new FetchFileLoader('https://www.click-tt.ch', queue);

  const context = new ScraperContext(
    config,
    queue,
    loader,
    db,
    ScraperContext.featuresFromArgv(process.argv),
  );

  const tasks = [
    new Task('championships', () => championships(context), context.features.championships),
    new Task('teams', () => teams(context, {championshipID, leagueID}), context.features.teams),
    new Task('matches', () => matches(context, {championshipID, leagueID, teamID: teamID}), context.features.matches),
    new Task('players', () => players(context, {championshipID, leagueID, teamID: teamID}), context.features.players),
  ];

  for (const task of tasks) {
    try {
      await task.execute();
    } catch (e) {
      console.error();
    }
  }

  const all = await Promise.allSettled(tasks);
  const errors = all.filter((e) => e.status === 'rejected');
  errors.forEach((e) => console.error(e.reason));

  if (errors.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
})();
