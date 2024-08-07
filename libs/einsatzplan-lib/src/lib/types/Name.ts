export interface Name {
  displayedName: string;
  displayedNameFormal: string;
  givenName: string;
  familyName: string;
}

function buildDisplayedName(givenName: string, familyName: string): string {
  return `${givenName} ${familyName}`;
}

export function parseName(text: string): Name {
  const cleanText = text.trim();

  const parts = cleanText.split(/,\s*/);
  const givenName = parts[1];
  const familyName = parts[0];
  const displayedNameFormal = cleanText;
  const displayedName = buildDisplayedName(givenName, familyName);

  return {
    displayedName,
    displayedNameFormal,
    givenName,
    familyName
  };
}
