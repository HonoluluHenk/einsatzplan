import {parseMatchesFromIcal} from "./parseMatchesFromCsv";
import {writeMatchesJson} from "./writeMatchesJson";

describe('parseMatchesFromCsv', () => {
  it('does its thing', async () => {
    const matches = await parseMatchesFromIcal('./data/club/33282/teams/OM3/getTeamMeetingsWebcal.ics');

    console.log('matches', matches);

    await writeMatchesJson(matches, './data/club/33282/teams/OM3/matches.json');
  });
});
