import {parsePlayersFromCsv} from "./parsePlayersFromCsv";

describe('parsePlayersFromCsv', () => {
  it('parses players from csv', async () => {
    // console.log('cwd: ', process.cwd());
    const players = await parsePlayersFromCsv('../../data/club/33282/players/players-female.csv');
    // const players = await parsePlayersFromCsv('../../data/club/33282/players/players-male.csv');


    console.log('players', players);
  });
});
