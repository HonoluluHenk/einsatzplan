export interface Name {
  displayedName: string | undefined;
  givenName: string;
  familyName: string;
}

function displayedName(name: Name): string {
  return name.displayedName ?? `${name.givenName} ${name.familyName}`;
}
