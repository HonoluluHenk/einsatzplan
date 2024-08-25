export interface Name {
  displayedName: string;
  displayedNameFormal: string;
  displayedNameShort: string;
  givenName: string;
  familyName: string;
}

export function buildDisplayedName(
  givenName: string,
  familyName: string,
): string {
  return `${givenName} ${familyName}`;
}

function buildDisplayedNameShort(
  givenName: string,
  familyName: string,
)
{
  return `${givenName} ${familyName.charAt(0)}.`;
}

/**
 * Parses a name from a string in the format "Family Name, Given Name".
 */
export function parseName(text: string): Name {
  const cleanText = text.trim();

  const parts = cleanText.split(/,\s*/);
  const givenName = parts[1].trim();
  const familyName = parts[0].trim();
  const displayedNameFormal = cleanText;
  const displayedName = buildDisplayedName(givenName, familyName);
  const displayedNameShort = buildDisplayedNameShort(givenName, familyName);

  return {
    displayedName,
    displayedNameFormal,
    displayedNameShort,
    givenName,
    familyName,
  };
}
