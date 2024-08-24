import type { ChampionshipID } from '@einsatzplan/einsatzplan-lib/model';
import type { Season } from '@einsatzplan/einsatzplan-lib/model/Season';

export interface ChampionshipLink {
  id: ChampionshipID;
  shortName: string,
  url: string;
  season: Season;
}
