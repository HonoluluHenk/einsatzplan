import {parsePlayersFromCsv} from "./parsePlayersFromCsv";
import {groupingBy} from "@einsatzplan/einsatzplan-lib/util/list-util";
import {writeJsonToFile} from "../writeJsonToFile";

describe('parsePlayersFromCsv', () => {
  it('parses players from csv', async () => {
    // console.log('cwd: ', process.cwd());
    const males = await parsePlayersFromCsv(fixtureFile('/club/33282/players/players-male.csv'));
    const females = await parsePlayersFromCsv(fixtureFile('/club/33282/players/players-female.csv'));

    const players = [...males, ...females]
      .reduce(groupingBy('id'), {})
    ;


    // console.log('players', JSON.stringify(players));

    // console.log('process.cwd', process.cwd());
    const file = projectRootDir() + '/apps/einsatzplan/public/assets/championship/MTTV 24_25/Ostermundigen III/players/players.json';
    await writeJsonToFile(players, file)
  });
});
