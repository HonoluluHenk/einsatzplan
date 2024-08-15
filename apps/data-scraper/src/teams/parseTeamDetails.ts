import { type Address, type TeamContact, type Venue } from '@einsatzplan/einsatzplan-lib/model';
import { parseName } from '@einsatzplan/einsatzplan-lib/model/Name';
import type { EmailAddress } from '@einsatzplan/einsatzplan-lib/types/EmailAddress';
import { parseID } from '@einsatzplan/einsatzplan-lib/types/ID.type';
import type { PhoneNumber } from '@einsatzplan/einsatzplan-lib/types/PhoneNumber';
import { ensureProps } from '@einsatzplan/einsatzplan-lib/util/ensure';
import { isNullish, type Nullish, requireValue } from '@einsatzplan/einsatzplan-lib/util/nullish';
import type { Cheerio } from 'cheerio';
import * as cheerio from 'cheerio';
import { Element } from 'domhandler';

export type TeamDetail = {
  venues: Venue[];
  contact: TeamContact;
}


export async function parseTeamDetails(
  html: string,
): Promise<TeamDetail> {
  const $ = cheerio.load(html);

  const teamDetailTable = $('h1').next('table.result-set');
  const rows = $('tbody tr', teamDetailTable);

  const contact = parseContact(rows);
  const venues = parseVenues(rows);

  return {
    venues,
    contact,
  };
}

function parseContact(rows: Cheerio<Element>): TeamContact {
  const row = findRowWithTitle('Kapitän', rows);
  const contentRows = row.children('td:nth-child(2)').contents()
    .filter((
      _,
      el,
    ) => !(el instanceof Element && el.tagName === 'br'))
    .toArray()
    .map((el) => cheerio.load(el).text().trim())
  ;
  const name = parseName(contentRows[0]);
  const phone = parsePhone(contentRows[1]);
  const email = parseEmail(contentRows[2]);

  const result: TeamContact = {
    name,
    phone,
    email,
  };

  return result;
}

function findRowWithTitle(
  title: string,
  rows: Cheerio<Element>,
): Cheerio<Element> {
  return rows.filter((
    _,
    row,
  ) => {
    const rowTitle = cheerio.load(row)('td:nth-child(1)').text().trim();
    return rowTitle === title;
  });
}

function parsePhone(text: string | Nullish): PhoneNumber | '' {
  if (isNullish(text) || text.length === 0) {
    return '';
  }

  // input format: "Mobil: 078 774 09 37"
  const phoneMatches = /Mobil: ([\d ]+)/
    .exec(text);

  const result = phoneMatches?.[1] ?? '';

  return result;

}

function parseEmail(text: string | Nullish): EmailAddress | '' {
  if (isNullish(text) || text.length === 0) {
    return '';
  }

  // input format: "encodeEmail('tld', 'name1', 'hostname', 'name2 or empty')"
  const stripped = text.replace('encodeEmail(', '').replace(')', '');

  const parts = stripped.split(', ')
    .map((part) => part.replace(/'/g, ''));
  const [topLevelDomain, m1, domain, m2] = parts;

  const result = encodeEmail(topLevelDomain, m1, domain, m2);

  return result as EmailAddress;

}

// lolwhut?
// taken from the actual website:
// view-source:https://www.click-tt.ch/WebObjects/nuLiga.woa/Frameworks/nuLigaWebResources.framework/WebServerResources/js/default.js?nlv=51b33d5a
// and cleaned up
function encodeEmail(
  topLevelDomain: string,
  namePart1: string,
  domain: string,
  namePart2: string,
): string {
  const name = namePart2 === '' ? namePart1 : `${namePart1}.${namePart2}`;
  return `${name}@${domain}.${topLevelDomain}`;
}

function parseVenueNumber(
  repetitions: string[],
  text: string,
): number {
  // input example: "Spiellokal 1:"
  const execElement = requireValue(/Spiellokal (\d+):/.exec(text)?.[1], `Cannot parse venue number from ${text}`);
  const result = parseInt(execElement, 10);

  return result;
}

function parseVenues(rows: Cheerio<Element>): Venue[] {
  const row = findRowWithTitle('Verein', rows);
  const contents = row.children('td:nth-child(2)').contents();
  const contentRows = contents
    .toArray()
    .map((el) => cheerio.load(el).text().trim())
    .filter(content => content.length !== 0)
  ;

  // row 0: Club-Name + link to club page
  // row 1: "Spiellokal "Venue number":"
  // row 2: Venue name
  // row 3: Venue address
  // row 4+: repetition of 1-3

  const result: Venue[] = [];

  const repetitions = contentRows.slice(1);
  const venueRows = 3;

  for (let i = 0; repetitions.length >= (i + 1) * venueRows; i++) {
    const idx = i * venueRows;
    const numberIdx = idx;
    const nameIdx = idx + 1;
    const addressIdx = idx + 2;

    const number = parseVenueNumber(repetitions, repetitions[numberIdx]);
    const id = parseID('Venue', '' + number);
    const name = repetitions[nameIdx].trim();
    const addressLine = repetitions[addressIdx].trim();

    const address: Address = parseAddress(addressLine);

    const venue = ensureProps<Venue>({
      id,
      number,
      name,
      address,
    });

    result.push(venue);
  }

  return result;
}

function parseAddress(
  addressLine: string,
): Address {
  // input example: "Dennigkofenweg 169, 3072 Ostermundigen"
  const parts = /([^,]+), (\d+) (.+)/.exec(addressLine);
  const street = requireValue(parts?.[1], `Could not parse address from ${addressLine}`);
  const zip = requireValue(parts?.[2], `Could not parse address from ${addressLine}`);
  const city = requireValue(parts?.[3], `Could not parse address from ${addressLine}`);

  const result: Address = {
    street,
    zip,
    city,
  };

  return result;
}
