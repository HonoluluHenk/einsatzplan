import * as  fs from 'fs/promises';
import {Match} from "@einsatzplan/einsatzplan-lib/model";

export async function writeMatchesJson(matches: Match[], filePath: string) {
  return await fs.writeFile(filePath, JSON.stringify(matches, null, 2));
}
