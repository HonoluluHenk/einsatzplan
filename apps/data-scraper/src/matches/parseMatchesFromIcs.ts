import * as fs from 'fs/promises';

// @ts-expect-error
import {Component, Event, parse} from 'ical.js';
import {ensureProps} from "@einsatzplan/einsatzplan-lib/util/ensure";
import {createID} from "@einsatzplan/einsatzplan-lib/types/ID.type";
import {asISOLocalDateString, asISOLocalTimeString} from "@einsatzplan/einsatzplan-lib/util/date-util";
import {requireValue} from "@einsatzplan/einsatzplan-lib/util/nullish";
import {Match} from "@einsatzplan/einsatzplan-lib/model";

export async function parseMatchesFromIcs(filePath: string): Promise<Match[]> {
  const content = await fs.readFile(filePath, 'utf-8');

  const jcal = parse(content);
  const comp = new Component(jcal);
  const vevents: Component[] = comp.getAllSubcomponents('vevent');

  const matches = vevents.map(parseEvent);

  const result = matches.map(m => {
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
  })

  return result;
}

function parseEvent(vevent: Event): Match {
  const event = new Event(vevent);

  const summary = event.summary;
  const description = event.description;
  const location = event.location;
  const organizer = event.organizer;
  const startDate = event.startDate.toJSDate();
  const uid = event.uid;

  // console.log('calendar', calendar);
  const tz = 'Europe/Zurich';
  const utcDate = startDate;//zonedTimeToUtc(startDate, tz);
  const date = asISOLocalDateString(utcDate);
  const startTime = asISOLocalTimeString(utcDate);

  const homeTeam = parseHomeTeam(description);
  const opponentTeam = parseOpponentTeam(description);

  const match = ensureProps<Match>({
    id: createID('Match', uid),
    homeTeamId: createID('Team', homeTeam),
    opponentTeamId: createID('Team', opponentTeam),
    venueId: createID('Venue', '1'),
    date,
    startTime,
    flags: undefined,
    plannedSetup: undefined
  });
  return match;
}

function parseHomeTeam(description: string) {
  const result = requireValue(/Heim: (.*?)\n/.exec(description)?.[1], `Heim team not found in : ${description}`);
  return result;
}

function parseOpponentTeam(description: string) {
  return requireValue(/Gast: (.*?)\n/.exec(description)?.[1], `Opponent team not found in : ${description}`);
}
