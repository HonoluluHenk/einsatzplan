import type { TeamContact } from '@einsatzplan/model/Team';
import type { Venue } from '@einsatzplan/model/Venue';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import fs from 'fs';
import { parseTeamDetails } from './parseTeamDetails';

describe('parseTeamDetails', () => {

  it('parses a team with single entry', async () => {
    const content =
      fs.readFileSync(fixtureFile('league/teams/click-TT – Mannschaftsportrait-Ostermundigen III.html'), 'utf8');

    const actual = await parseTeamDetails(content);

    expect(actual)
      .toEqual({
        venues: [
          ensureProps<Venue>({
            id: 'Venue:1',
            number: 1,
            name: 'Turnhalle orange, UG, Schule Dennigkofen',
            address: {
              street: 'Dennigkofenweg 169',
              zip: '3072',
              city: 'Ostermundigen',
            },
          }),
        ],
        contact: {
          name: {
            displayedName: 'Christoph Linder',
            displayedNameFormal: 'Linder, Christoph',
            displayedNameShort: 'Christoph L.',
            givenName: 'Christoph',
            familyName: 'Linder',
          },
          phone: '078 774 09 37',
          email: 'post@christoph-linder.ch',
        },
      });
  });

  it('parses a team with multiple entries', async () => {
    const content =
      fs.readFileSync(fixtureFile('league/teams/click-TT – Mannschaftsportrait-Tiefenau.html'), 'utf8');

    const actual = await parseTeamDetails(content);

    expect(actual)
      .toEqual({
        venues: [
          ensureProps<Venue>({
            id: 'Venue:1',
            number: 1,
            name: 'Schulhaus Äussere Enge (bis 13.10.22)',
            address: {
              street: 'Studerstrasse 56',
              zip: '3004',
              city: 'Bern',
            },
          }),
          ensureProps<Venue>({
            id: 'Venue:2',
            number: 2,
            name: 'Sporthalle Kleefeld (ab 21.10.2022)',
            address: {
              street: 'Mädergutstrasse 33',
              zip: '3018',
              city: 'Bern',
            },
          }),
        ],
        contact: ensureProps<TeamContact>({
          name: {
            displayedName: 'Andreas Güdel',
            displayedNameFormal: 'Güdel, Andreas',
            displayedNameShort: 'Andreas G.',
            givenName: 'Andreas',
            familyName: 'Güdel',
          },
          phone: '',
          email: '',
        }),
      });
  });


});
