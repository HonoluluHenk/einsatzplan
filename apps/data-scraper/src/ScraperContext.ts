import type { Database } from '@angular/fire/database';
import type { AssociationName } from '@einsatzplan/model/Association';
import type { ChampionshipID, ChampionshipMasterData } from '@einsatzplan/model/Championship';
import type { GroupID, GroupMasterData } from '@einsatzplan/model/GroupMasterData';
import type { Match, MatchID } from '@einsatzplan/model/Match';
import type { Player, PlayerID } from '@einsatzplan/model/Player';
import { parseFromName, type Season, type SeasonName } from '@einsatzplan/model/Season';
import type { Team, TeamID } from '@einsatzplan/model/Team';
import type PQueue from 'p-queue';
import type { SeasonConfig } from './config/SeasonConfig';
import { type FileLoader } from './utils/FileLoader';

type ScraperFeatures = {
  championships: boolean;
  groups: boolean;
  matches: boolean;
  players: boolean;
  teams: boolean;
};

export class ScraperContext {
  readonly parsed: {
    championships: Record<ChampionshipID, ChampionshipMasterData>;
    groups: Record<GroupID, GroupMasterData>;
    matches: Record<MatchID, Match>;
    players: Record<PlayerID, Player>;
    teams: Record<TeamID, Team>;
  } = {
    championships: {},
    groups: {},
    matches: {},
    players: {},
    teams: {},
  };

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
    // leaves
    const players = allEnabled || argv.includes('--players');
    const teams = allEnabled || argv.includes('--teams');

    // branches
    const matches = allEnabled || argv.includes('--matches');
    const groups = allEnabled || matches || players || argv.includes('--groups');
    const championships = allEnabled || groups || matches || players || argv.includes('--championships');

    const features: ScraperFeatures = {
      championships,
      groups,
      matches,
      players,
      teams,
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
