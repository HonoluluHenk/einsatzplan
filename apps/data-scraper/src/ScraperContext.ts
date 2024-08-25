import type { Database } from '@angular/fire/database';
import type { AssociationName } from '@einsatzplan/model/Association';
import { parseFromName, type Season, type SeasonName } from '@einsatzplan/model/Season';
import type PQueue from 'p-queue';
import type { SeasonConfig } from './config/SeasonConfig';
import { type FileLoader } from './utils/FileLoader';

type ScraperFeatures = {
  championships: boolean
  matches: boolean;
  players: boolean;
  teams: boolean;
};

export class ScraperContext {

  constructor(
    private readonly config: SeasonConfig,
    readonly queue: PQueue,
    readonly loader: FileLoader,
    readonly db: Database,
    readonly features: ScraperFeatures,
  )
  {
    // nop
  }

  static featuresFromArgv(argv: string[]): ScraperFeatures {
    const allEnabled = argv.includes('--all');

    const features: ScraperFeatures = {
      championships: allEnabled || argv.includes('--championships'),
      matches: allEnabled || argv.includes('--matches'),
      players: allEnabled || argv.includes('--players'),
      teams: allEnabled || argv.includes('--teams'),
    };

    return features;
  }

  get seasonName(): SeasonName {
    return this.config.season;
  }

  get season(): Season {
    return parseFromName(this.seasonName);
  }

  get associations(): AssociationName[] {
    return this.config.associations;
  }


}
