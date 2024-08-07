import {parseMatchesFromIcs} from "./parseMatchesFromIcs";
import {groupingBy} from "@einsatzplan/einsatzplan-lib/util/list-util";
import {createID} from "@einsatzplan/einsatzplan-lib/types/ID.type";
import {writeJsonToFile} from "../writeJsonToFile";

describe('parseMatchesFromIc', () => {

  it('does its thing', async () => {
    console.log('process.cwd', process.cwd())
    const matchesList = await parseMatchesFromIcs(fixtureFile('club/33282/teams/OM3/getTeamMeetingsWebcal.ics'));
    const matchesWorkaround = matchesList
      .map(m => {
        if (m.homeTeamId === createID('Team', 'Bern IV')
          && m.opponentTeamId === createID('Team', 'Ostermundigen III')) {
          // FIXME: temporary hack until we have venue parsing implemented
          return {
            ...m,
            venueId: createID('Venue', '2')
          };
        } else {
          return m;
        }
      });

    const matches = matchesWorkaround
      .reduce(groupingBy('id'), {})

    // console.log('matches', matches);
    //
    // console.log('process.cwd', process.cwd())
    const file = projectRootDir() + '/apps/einsatzplan/public/assets/championship/MTTV 24_25/Ostermundigen III/matches/matches.json';
    await writeJsonToFile(matches, file);
  });
});
