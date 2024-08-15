import fs from 'fs/promises';

export interface FileLoader {
  load(url: string): Promise<string>;
}

export class FixtureFileLoader implements FileLoader {
  constructor(readonly urlsWithReplacements: Map<string, string>) {
  }

  async load(url: string): Promise<string> {
    const replacement = this.urlsWithReplacements.get(url);
    if (!replacement) {
      throw new Error(`No replacement set for url: ${url}`);
    }

    try {
      const result = await fs.readFile(replacement, 'utf-8');

      return result;
    } catch (error) {
      throw new Error(`Error loading file: ${replacement}: ${JSON.stringify(error)}`);
    }
  }

}

export class FetchFileLoader implements FileLoader {
  async load(url: string): Promise<string> {
    const response = await fetch(url);
    const result = await response.text();

    return result;
  }
}
