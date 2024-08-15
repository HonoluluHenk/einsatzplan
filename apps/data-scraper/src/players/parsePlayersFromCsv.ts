import type { Player } from '@einsatzplan/einsatzplan-lib/model';
import { parseName } from '@einsatzplan/einsatzplan-lib/model/Name';
import { parseID } from '@einsatzplan/einsatzplan-lib/types/ID.type';
import { hasValue } from '@einsatzplan/einsatzplan-lib/util/nullish';
import * as fs from 'fs/promises';
import Papa from 'papaparse';

export async function parsePlayersFromCsv(file: string): Promise<Player[]> {
  const csvContent = await fs.readFile(file, 'utf-8');

  const csv = Papa.parse<string[]>(csvContent, {
    delimiter: '\t',
  });

  // console.log('csv', csv);

  if (csv.errors.length) {
    throw new Error('CSV parsing failed: ' + JSON.stringify(csv.errors));
  }

  const result = csv.data.map((row) => parsePlayer(row))
    .filter(hasValue);

  return result;
}

function parsePlayer(cols: string[]): Player | undefined {
  if (cols.length === 0 || cols.length === 1) {
    // empty row
    return undefined;
  }
  if (cols.length !== 5) {
    throw new Error('Invalid player row: ' + cols);
  }

  const id = parseID('Player', cols[2].trim());
  const name = parseName(cols[1].trim());
  const phone = undefined;
  const email = undefined;
  const googleCalendarId = undefined;
  const appleCalendarId = undefined;
  const classification = cols[0].split(/\s+\/\s+/);
  const sex = classification.length > 1 ? 'F' : 'M';
  const maleClassification = classification[0].trim();
  const femaleClassification = classification[1]?.trim();
  // const ageGroup = cols[3].trim();
  // const nationality = cols[4].trim();

  // FIXME: implement validation

  return {
    id,
    name,
    sex,
    maleClassification,
    femaleClassification,
    phone,
    email,
    googleCalendarId,
    appleCalendarId,
  };
}
