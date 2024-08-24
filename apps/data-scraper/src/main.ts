import { parseID } from '@einsatzplan/einsatzplan-lib/types/ID.type';
import { cleanPathSegmentForFirebaseKey } from '@einsatzplan/einsatzplan-lib/util/firebase-util';

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// eslint-disable-next-line @nx/enforce-module-boundaries
import firebaseConfig from '../../../developer-local-settings/config/firebase-client.json';
import { config } from './assets/config';
import { championships } from './championships';
import { matches } from './matches';
import { players } from './players';
import { Task } from './Task';
import { teams } from './teams';
import { FetchFileLoader } from './utils/FileLoader';

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

const loader = new FetchFileLoader('https://www.click-tt.ch');

const championship = cleanPathSegmentForFirebaseKey('MTTV 24_25');
const league = cleanPathSegmentForFirebaseKey('HE 3. Liga Gr. 3');
const teamID = parseID('Team', cleanPathSegmentForFirebaseKey('Ostermundigen III'));

const allEnabled = process.argv.includes('--all');
const matchesEnabled = allEnabled || process.argv.includes('--matches');
const playersEnabled = allEnabled || process.argv.includes('--players');
const teamsEnabled = allEnabled || process.argv.includes('--teams');
const championshipsEnabled = allEnabled || process.argv.includes('--championships');


(async () => {
  const tasks = [
    new Task('championships', () => championships({
      config,
      loader,
      db,
    }), championshipsEnabled),
    new Task('teams', () => teams({
      championship: championship,
      league: league,
      loader,
      db,
    }), teamsEnabled),
    new Task('matches', () => matches({
      championship: championship,
      league: league,
      teamID: teamID,
      db,
    }), matchesEnabled),
    new Task('players', () => players({
      championship: championship,
      league: league,
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
