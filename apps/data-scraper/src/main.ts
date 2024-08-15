import { cleanPathForFirebaseKey } from '@einsatzplan/einsatzplan-lib/util/firebase-util';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// eslint-disable-next-line @nx/enforce-module-boundaries
import firebaseConfig from '../../../developer-local-settings/config/firebase-client.json';
import { scrapeMatches, uploadMatches } from './matches/matches-scraper';
import { scrapePlayers, uploadPlayers } from './players/players-scraper';
import { scrapeTeams, uploadTeams } from './teams/teams-scraper';
import { FetchFileLoader } from './utils/FileLoader';

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

const championship = cleanPathForFirebaseKey('MTTV 24_25');
const league = cleanPathForFirebaseKey('HE 3. Liga Gr. 3');
const team = cleanPathForFirebaseKey('Ostermundigen III');

//eslint-disable-next-line @typescript-eslint/no-unused-vars
async function matches(): Promise<void> {
  try {
    const matches = await scrapeMatches('./data/club/33282/teams/OM3/getTeamMeetingsWebcal.ics');
    await uploadMatches(matches, championship, league, team, db);
    console.log('matches saved:', Object.values(matches).length);

  } catch (error) {
    console.error('matches failed: ', error);
    throw Error('matches failed');
  }
}

//eslint-disable-next-line @typescript-eslint/no-unused-vars
async function players(): Promise<void> {
  try {
    const players = await scrapePlayers(
      './data/club/33282/players/players-female.csv',
      './data/club/33282/players/players-male.csv',
    );
    await uploadPlayers(players, championship, league, team, db);
    console.log('players saved:', Object.values(players).length);


  } catch (error) {
    console.error('players failed: ', error);
    throw Error('players failed');
  }
}

async function teams(): Promise<void> {
  try {
    const data = await fetch('https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/groupPage?championship=MTTV+24%2F25&group=214709');
    const html = await data.text();

    const teams = await scrapeTeams(
      html,
      new FetchFileLoader(),
    );
    await uploadTeams(teams, championship, league, db);
    console.log('teams saved:', Object.values(teams).length);


  } catch (error) {
    console.error('teams failed: ', error);
    throw Error('teams failed');
  }
}


(async () => {
  const todos = [
    //matches(),
    //players(),
    teams(),
  ];

  const all = await Promise.allSettled([todos]);
  const errors = all.filter((e) => e.status === 'rejected');
  errors.forEach((e) => console.error(e.reason));

  if (errors.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
})();
