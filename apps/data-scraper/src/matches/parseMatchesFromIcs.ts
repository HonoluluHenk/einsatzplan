import type { Match } from '@einsatzplan/model/Match';
import { asISOLocalDateString, asISOLocalTimeString } from '@einsatzplan/shared-util/date-util';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { requireValue } from '@einsatzplan/shared-util/nullish';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import * as fs from 'fs/promises';

// @ts-expect-error ical-js has no types
import { Component, Event, parse } from 'ical.js';

export async function parseMatchesFromIcs(filePath: string): Promise<Match[]> {
  const content = await fs.readFile(filePath, 'utf-8');

  const jcal = parse(content);
  const comp = new Component(jcal);
  const vevents: Component[] = comp.getAllSubcomponents('vevent');

  const matches = vevents.map(parseEvent);

  const result = matches.map((m) => {
    if (
      m.homeTeamId === parseID('Team', 'Bern IV') &&
      m.opponentTeamId === parseID('Team', 'Ostermundigen III')
    )
    {
      // FIXME: temporary hack until we have venue parsing implemented
      return {
        ...m,
        venueId: parseID('Venue', '2'),
      };
    } else {
      return m;
    }
  });

  return result;
}

function parseEvent(vevent: Event): Match {
  const event = new Event(vevent);

  const description = event.description;
  const startDate = event.startDate.toJSDate();
  const uid = event.uid;

  // console.log('calendar', calendar);
  // const tz = 'Europe/Zurich';
  const utcDate = startDate; //zonedTimeToUtc(startDate, tz);
  const date = asISOLocalDateString(utcDate);
  const startTime = asISOLocalTimeString(utcDate);

  const homeTeam = parseHomeTeam(description);
  const opponentTeam = parseOpponentTeam(description);

  const match = ensureProps<Match>({
    id: parseID('Match', uid),
    homeTeamId: parseID('Team', homeTeam),
    opponentTeamId: parseID('Team', opponentTeam),
    venueId: parseID('Venue', '1'),
    date,
    startTime,
    flags: undefined,
  });
  return match;
}

function parseHomeTeam(description: string) {
  const result = requireValue(
    /Heim: (.*?)\n/.exec(description)?.[1],
    `Heim team not found in : ${description}`,
  );
  return result;
}

function parseOpponentTeam(description: string) {
  return requireValue(
    /Gast: (.*?)\n/.exec(description)?.[1],
    `Opponent team not found in : ${description}`,
  );
}
