import fs from 'fs/promises';
import type PQueue from 'p-queue';

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
  /**
   * Map<url, content>
   */
  readonly #cache = new Map<string, string>();

  constructor(
    readonly baseURL: string,
    private readonly queue: PQueue,
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
    const cached = this.#cache.get(url);
    if (cached) {
      console.debug('loading cached url:', url);
      return Promise.resolve(cached);
    }

    try {
      console.debug('loading remote url:', url);
      return await this.queue.add(
        async () => await this.fetchUrl(url),
        {throwOnTimeout: true},
      );

    } catch (error) {
      throw new Error(`Error loading url: ${url}: ${JSON.stringify(error)}`);
    }
  }

  private async fetchUrl(url: string): Promise<string> {
    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'de-CH',
      },
    });
    const result = await response.text();

    return result;
  }
}
