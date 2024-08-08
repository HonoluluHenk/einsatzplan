export interface Name {
  displayedName: string;
  displayedNameFormal: string;
  displayedNameShort: string;
  givenName: string;
  familyName: string;
}

function buildDisplayedName(givenName: string, familyName: string): string {
  return `${givenName} ${familyName}`;
}

function buildDisplayedNameShort(givenName: string, familyName: string) {
  return `${givenName} ${familyName.charAt(0)}.`;
}

export function parseName(text: string): Name {
  const cleanText = text.trim();

  const parts = cleanText.split(/,\s*/);
  const givenName = parts[1];
  const familyName = parts[0];
  const displayedNameFormal = cleanText;
  const displayedName = buildDisplayedName(givenName, familyName);
  const displayedNameShort = buildDisplayedNameShort(givenName, familyName);

  return {
    displayedName,
    displayedNameFormal,
    displayedNameShort,
    givenName,
    familyName
  };
}
