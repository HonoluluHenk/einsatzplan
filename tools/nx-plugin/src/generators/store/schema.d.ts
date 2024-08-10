import type { NameAndDirectoryFormat } from '@nx/devkit/src/generators/artifact-name-and-directory-utils';

export interface StoreGeneratorGeneratorSchema {
  /**
   * The name of the store.
   */
  name: string;
  /**
   * The directory of the new store, relative to the workspace root.
   */
  directory?: string;
  nameAndDirectoryFormat?: NameAndDirectoryFormat;
  /**
   * Skip running lint fix after generating the store.
   */
  skipLintFix?: boolean;
}

export interface NormalizedSchema {
  directory: string;
  nameAndDirectoryFormat: NameAndDirectoryFormat;
  filePath: string;
  fileName: string;
  storeClassName: string;
  stateClassName: string;
  skipLintFix: boolean;
}
