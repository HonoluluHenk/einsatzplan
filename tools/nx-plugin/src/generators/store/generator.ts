import {
  formatFiles,
  generateFiles,
  names,
  OverwriteStrategy,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { NormalizedSchema, StoreGeneratorGeneratorSchema } from './schema';
import { determineArtifactNameAndDirectoryOptions } from '@nx/devkit/src/generators/artifact-name-and-directory-utils';
import { dasherize } from '@nx/devkit/src/utils/string-utils';
import { loadESLint } from 'eslint';

export async function storeGeneratorGenerator(
  tree: Tree,
  rawOptions: StoreGeneratorGeneratorSchema
) {
  const options = await normalizeOptions(tree, rawOptions);
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.directory,
    {
      ...options,
      tpl: '',
    },
    { overwriteStrategy: OverwriteStrategy.Overwrite }
  );

  await formatFiles(tree);

  return async () => {
    const files = tree.listChanges().map((c) => c.path);
    console.log('Running eslint --fix on generated files:', files);

    await runESLint(tree.root, files);
  };
}

async function normalizeOptions(
  tree: Tree,
  rawOptions: StoreGeneratorGeneratorSchema
): Promise<NormalizedSchema> {
  const {
    artifactName: name,
    directory,
    fileName,
    filePath,
    nameAndDirectoryFormat,
  } = await determineArtifactNameAndDirectoryOptions(tree, {
    artifactType: 'store',
    callingGenerator: '@einsatzplan/nx-plugin:store',
    name: dasherize(rawOptions.name),
    directory: rawOptions.directory,
    flat: true,
    nameAndDirectoryFormat: rawOptions.nameAndDirectoryFormat,
    suffix: 'store',
  });

  const storeClassName = `${names(name).className}${names('store').className}`;
  const stateClassName = `${names(name).className}${names('state').className}`;

  const result: NormalizedSchema = {
    directory,
    nameAndDirectoryFormat,
    filePath,
    fileName,
    storeClassName,
    stateClassName,
  };

  return result;
}

async function runESLint(rootDir: string, files: string[]) {
  const ESLint = await loadESLint({ useFlatConfig: false });
  const eslint = new ESLint({
    cwd: rootDir,
    fix: true,
  });
  const results = await eslint.lintFiles(files);
  await ESLint.outputFixes(results);
}

export default storeGeneratorGenerator;
