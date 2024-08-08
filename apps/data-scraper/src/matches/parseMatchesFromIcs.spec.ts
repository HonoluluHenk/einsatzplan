import {parseMatchesFromIcs} from "./parseMatchesFromIcs";

describe('parseMatchesFromIc', () => {

  it('does its thing', async () => {
    const matches = await parseMatchesFromIcs(fixtureFile('club/33282/teams/OM3/getTeamMeetingsWebcal.ics'));

    expect(matches)
      .toHaveLength(14);
  });
});
