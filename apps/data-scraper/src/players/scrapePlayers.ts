import type { Player, PlayerID } from '@einsatzplan/model/Player';
import { groupingBy } from '@einsatzplan/shared-util/list-util';
import { parsePlayersFromCsv } from './parsePlayersFromCsv';

export async function scrapePlayers(
  ...paths: string[]
): Promise<Record<PlayerID, Player>> {
  const playerArrays = await Promise.all(paths.map(p => parsePlayersFromCsv(p)));

  const players = playerArrays.flat()
    .reduce(groupingBy('id'), {});

  return Promise.resolve(players);
}

