import { parseID } from '@einsatzplan/shared-util/types/ID.type';

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// eslint-disable-next-line @nx/enforce-module-boundaries
import firebaseConfig from '../../../developer-local-settings/config/firebase-client.json';
import { championships } from './championships/championships';
import { config } from './config';
import { groups } from './groups/groups';
import { matches } from './matches/matches';
import { players } from './players/players';
import { ScraperContext } from './ScraperContext';
import { Task } from './Task';
import { teams } from './teams/teams';
import { FetchFileLoader } from './utils/FileLoader';


const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);


const championshipID = parseID('Championship', 'MTTV 24/25');
const groupID = parseID('Group', 'HE 3. Liga Gr. 2');
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
    new Task('championships', context.features.championships, async () => {
      context.parsed.championships = await championships(context);
    }),
    new Task('groups', context.features.groups, async () => {
      context.parsed.groups = await groups(context);
    }),
    new Task('teams', context.features.teams, async () => {
      context.parsed.teams = await teams(context, {championshipID, groupID: groupID});
    }),
    new Task('matches', context.features.matches, async () => {
      context.parsed.matches = await matches(context);
    }),
    new Task('players', context.features.players, async () => {
      context.parsed.players = await players(context, {championshipID, groupID: groupID, teamID: teamID});
    }),
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
