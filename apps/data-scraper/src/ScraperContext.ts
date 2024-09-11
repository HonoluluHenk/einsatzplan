import type { Database } from '@angular/fire/database';
import type { Championship, ChampionshipID, ChampionshipMasterData } from '@einsatzplan/model/Championship';
import type { Group, GroupID, GroupMasterData } from '@einsatzplan/model/GroupMasterData';
import type { Match, MatchID } from '@einsatzplan/model/Match';
import type { Name } from '@einsatzplan/model/Name';
import type { Player, PlayerID } from '@einsatzplan/model/Player';
import { parseFromName, type Season } from '@einsatzplan/model/Season';
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
    championships: Record<ChampionshipID, Championship>;
    championshipMD: Record<ChampionshipID, ChampionshipMasterData>;
    groups: Record<GroupID, Group>;
    groupMD: Record<GroupID, GroupMasterData>;
    matches: Record<MatchID, Match>;
    players: Record<PlayerID, Player>;
    teams: Record<TeamID, Team>;
  } = {
    championships: {},
    championshipMD: {},
    groups: {},
    groupMD: {},
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

  get seasonName(): Name {
    return this.config.season;
  }

  get season(): Season {
    return parseFromName(this.seasonName);
  }

  get associations(): Name[] {
    return this.config.associations;
  }


}
