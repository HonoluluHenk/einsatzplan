import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { Season } from '@einsatzplan/model/Season';

export interface ChampionshipLink {
  id: ChampionshipID;
  shortName: string,
  url: string;
  season: Season;
}
