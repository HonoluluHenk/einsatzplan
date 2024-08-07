import express from 'express';
import {parseMatchesFromIcs} from "./matches/parseMatchesFromIcs";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/api/matches-list', async (req, res) => {
  // res.send({ message: 'Hello API' });
  const matches = await parseMatchesFromIcs('./data/club/33282/teams/OM3/getTeamMeetingsWebcal.ics');
  res.send(matches);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}/api/matches-list`);
});
