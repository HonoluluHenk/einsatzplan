import * as  fs from 'fs/promises';

export async function writeJsonToFile(value: unknown, filePath: string) {
  return await fs.writeFile(filePath, JSON.stringify(value, null, 2) + '\n');
}
