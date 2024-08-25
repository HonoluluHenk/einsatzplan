import { parseFromName } from '@einsatzplan/model/Season';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// eslint-disable-next-line @nx/enforce-module-boundaries
import firebaseConfig from '../../../developer-local-settings/config/firebase-client.json';
import { championships } from './championships';
import { config } from './config';
import { matches } from './matches';
import { players } from './players';
import { Task } from './Task';
import { teams } from './teams';
import { FetchFileLoader } from './utils/FileLoader';


const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

const loader = new FetchFileLoader('https://www.click-tt.ch');

const championshipID = parseID('Championship', 'MTTV 24/25');
const leagueID = parseID('League', 'HE 3. Liga Gr. 3');
const teamID = parseID('Team', 'Ostermundigen III');

const allEnabled = process.argv.includes('--all');
const matchesEnabled = allEnabled || process.argv.includes('--matches');
const playersEnabled = allEnabled || process.argv.includes('--players');
const teamsEnabled = allEnabled || process.argv.includes('--teams');
const championshipsEnabled = allEnabled || process.argv.includes('--championships');


(async () => {
  const PQueue = await import('p-queue');
  const queue = new PQueue.default({concurrency: 2});
  const season = parseFromName(config.season);


  const tasks = [
    new Task('championships', () => championships({
      config,
      queue,
      loader,
      db,
    }), championshipsEnabled),
    new Task('teams', () => teams({
      seasonID: season.id,
      championshipID,
      leagueID,
      loader,
      db,
    }), teamsEnabled),
    new Task('matches', () => matches({
      seasonID: season.id,
      championshipID,
      leagueID,
      teamID: teamID,
      db,
    }), matchesEnabled),
    new Task('players', () => players({
      seasonID: season.id,
      championshipID,
      leagueID,
      teamID: teamID,
      db,
    }), playersEnabled),
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
