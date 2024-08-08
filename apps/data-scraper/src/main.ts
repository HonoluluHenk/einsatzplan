// import express from 'express';
import {parseMatchesFromIcs} from "./matches/parseMatchesFromIcs";
import {groupingBy} from "@einsatzplan/einsatzplan-lib/util/list-util";
import {getDatabase, ref, set} from "firebase/database";
import {initializeApp} from "firebase/app";
import {parsePlayersFromCsv} from "./players/parsePlayersFromCsv";

// import firebaseConfig from "./assets/firebase-client.json";
import firebaseConfig from "../../../developer-local-settings/config/firebase-client.json";
import {cleanPathForFirebaseKey} from "@einsatzplan/einsatzplan-lib/util/firebase-util";

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);


const championship = cleanPathForFirebaseKey('MTTV 24_25');
const league = cleanPathForFirebaseKey('HE 3. Liga Gr. 3');
const team = cleanPathForFirebaseKey('Ostermundigen III');

const matches = parseMatchesFromIcs('./data/club/33282/teams/OM3/getTeamMeetingsWebcal.ics')
  .then(matches => matches.reduce(groupingBy('id'), {}))
  .then(matches => {
    const path = `/championship/${championship}/leagues/${league}/teams/${team}/matches`;
    return set(ref(db, path), JSON.parse(JSON.stringify(matches)));
  })
  .then(() => console.log('matches saved'))
  .catch(error => {
    console.error('matches failed: ', error);
    throw Error('matches failed');
  })


// const players = Promise.resolve();
const players = Promise.all([
  parsePlayersFromCsv('./data/club/33282/players/players-female.csv'),
  parsePlayersFromCsv('./data/club/33282/players/players-male.csv'),
])
  .then(([femalePlayers, malePlayers]) =>
    [...femalePlayers, ...malePlayers]
      .reduce(groupingBy('id'), {})
  )
  .then(players => {
    const path = `/championship/${championship}/leagues/${league}/teams/${team}/eligible-players`;
    return set(ref(db, path), JSON.parse(JSON.stringify(players)));
  })
  .then(players => console.log('players saved'))
  .catch(error => {
    console.error('players failed: ', error);
    throw Error('players failed');
  });


(async () => {
  const r = await Promise.allSettled([matches, players]);
  const errors = r.filter(e => e.status === 'rejected');
  errors.forEach(e => console.error(e.reason));

  if (errors.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
})();
