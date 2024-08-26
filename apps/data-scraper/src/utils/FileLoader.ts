import fs from 'fs/promises';

export interface FileLoader {
  prependBaseURL(path: string): string;

  load(url: string): Promise<string>;
}

export class FixtureFileLoader implements FileLoader {
  baseURL = 'https://www.click-tt.ch';

  readonly urlsWithReplacements: Map<string, string>;

  constructor(urlsWithReplacements: Record<string, string> | Map<string, string>) {
    this.urlsWithReplacements = urlsWithReplacements instanceof Map
                                ? new Map(urlsWithReplacements)
                                : new Map(Object.entries(urlsWithReplacements));
  }

  prependBaseURL(url: string): string {
    // only prepend baseurl if it is not already present
    if (url.startsWith(this.baseURL)) {
      return url;
    }

    return `${this.baseURL}${url}`;
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
  constructor(
    readonly baseURL: string,
  )
  {
    // nop
  }

  prependBaseURL(url: string): string {
    // only prepend baseurl if it is not already present
    if (url.startsWith(this.baseURL)) {
      return url;
    }

    return `${this.baseURL}${url}`;
  }

  async load(url: string): Promise<string> {
    try {
      //console.debug('loading url:', url);
      const response = await fetch(url, {
        headers: {
          'Accept-Language': 'de-CH',
        },
      });
      const result = await response.text();

      return result;

    } catch (error) {
      throw new Error(`Error loading url: ${url}: ${JSON.stringify(error)}`);
    }
  }
}
