import {parsePlayersFromCsv} from "./parsePlayersFromCsv";

describe('parsePlayersFromCsv', () => {
  it('parses players from csv', async () => {
    // console.log('cwd: ', process.cwd());
    const males = await parsePlayersFromCsv(fixtureFile('/club/33282/players/players-male.csv'));
    const females = await parsePlayersFromCsv(fixtureFile('/club/33282/players/players-female.csv'));

    const players = [...males, ...females];

    expect(players)
      .toHaveLength(54);
  });
});
