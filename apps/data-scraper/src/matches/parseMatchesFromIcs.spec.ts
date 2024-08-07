import {parseMatchesFromIcs} from "./parseMatchesFromIcs";
import {writeMatchesJson} from "../writeMatchesJson";

describe('parseMatchesFromIc', () => {
  it('does its thing', async () => {
    const matches = await parseMatchesFromIcs('./data/club/33282/teams/OM3/getTeamMeetingsWebcal.ics');

    console.log('matches', matches);

    await writeMatchesJson(matches, 'apps/einsatzplan/public/assets/championship/MTTV%2024%2F25/Ostermundigen%20III/matches.json');
  });
});
