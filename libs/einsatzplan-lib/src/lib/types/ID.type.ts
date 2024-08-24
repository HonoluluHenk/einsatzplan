import { cleanPathSegmentForFirebaseKey } from '../util/firebase-util';

export type ID<Entity extends string> = `${Entity}:${string}`;
export type IDUnique = never;

export function isID<EntityName extends string>(
  entityName: EntityName,
  id: unknown,
): id is ID<EntityName> {
  return (
    typeof id === 'string' && id.match(new RegExp(`^${entityName}:.+`)) !== null
  );
}

export function parseID<EntityName extends string>(
  entityName: EntityName,
  unique: string,
): ID<EntityName> {
  const rawID: ID<EntityName> = `${entityName}:${unique}`;

  const result = cleanPathSegmentForFirebaseKey(rawID) as ID<EntityName>;
  if (!isID(entityName, result)) {
    throw new Error(`parsed ID ${result} is not a valid ID (source: ${rawID})`);
  }

  return result;
}

export function randomID<EntityName extends string>(
  entityName: EntityName,
): ID<EntityName> {
  return parseID(entityName, crypto.randomUUID());
}
