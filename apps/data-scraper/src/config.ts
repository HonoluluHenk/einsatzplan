import type { AssociationName } from '@einsatzplan/model/Association';
import type { SeasonName } from '@einsatzplan/model/Season';


export type Config = {
  season: SeasonName;
  associations: AssociationName[];
}

export const config: Config = {
  // as seen on Click-TT (https://www.click-tt.ch/index.htm.de)
  season: {shortName: '24/25', longName: '2024/25'},

  // Shortname: as seen on Click-TT (https://www.click-tt.ch/index.htm.de)
  // longName: as seen on
  // https://www.click-tt.ch/cgi-bin/WebObjects/nuLigaTTCH.woa/wa/clubSearch?federation=STT&preferredLanguage=German
  // These are pretty constant so we can hardcode them here
  associations: [
    {shortName: 'STT', longName: 'Nationalliga'},
    //{shortName: 'AGTT', longName: 'Association Genevoise de Tennis de Table'},
    //{shortName: 'ANJTT', longName: 'Association Neuchâteloise et Jurassienne de Tennis de Table'},
    //{shortName: 'ATTT', longName: 'Associazione Ticinese Tennis Tavolo'},
    //{shortName: 'AVVF', longName: 'Association Vaud, Valais, Fribourg'},
    {shortName: 'MTTV', longName: 'Mittelländischer Tischtennisverband'},
    {shortName: 'NWTTV', longName: 'Nordwestschweizerischer Tischtennisverband'},
    //{shortName: 'OTTV', longName: 'Ostschweizer Tischtennisverband'},
    //{shortName: 'TTVI', longName: 'Tischtennisverband Innerschweiz'},
    //{shortName: 'Schweizer Cup', longName: 'Schweizer Cup'},
    //{shortName: 'SJC', longName: 'Suisse Junior Challenge'},
    //{shortName: 'FL', longName: 'Friendship League'},
  ],
};
