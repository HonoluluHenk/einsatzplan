import type { AssociationName } from '@einsatzplan/model/Association';
import type { SeasonName } from '@einsatzplan/model/Season';

export type SeasonConfig = {
  season: SeasonName;
  associations: AssociationName[];
}
