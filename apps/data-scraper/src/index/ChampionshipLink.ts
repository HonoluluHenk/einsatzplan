import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { Season } from '@einsatzplan/model/Season';

// ChampionshipLink represents the data that is scraped from
// the left side index of the page of click-tt.ch
// e.g.: "MTTV 2024/25"
export interface ChampionshipLink {
  id: ChampionshipID;
  shortName: string,
  url: string;
  season: Season;
}
