export type ID<Entity extends string> = `${Entity}:${string}`;
export type IDUnique = never;

export function isID<EntityName extends string>(
  entityName: EntityName,
  id: unknown
): id is ID<EntityName> {
  return typeof id === 'string' && id.match(new RegExp(`^${entityName}:.+`)) !== null;
}

export function createID<EntityName extends string>(entityName: EntityName, unique: string): ID<EntityName> {
  return `${entityName}:${unique}`;
}

export function randomID<EntityName extends string>(entityName: EntityName): ID<EntityName> {
  return createID(entityName, crypto.randomUUID() as IDUnique);
}
