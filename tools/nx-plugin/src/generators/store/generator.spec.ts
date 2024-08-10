import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import type { Tree } from '@nx/devkit';
import { readProjectConfiguration } from '@nx/devkit';

import { storeGeneratorGenerator } from './generator';
import libraryGenerator from '@nx/js/src/generators/library/library';

describe('store generator', () => {
  let tree: Tree;
  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace({});
    await libraryGenerator(tree, {
      name: 'testing-lib',
      directory: 'libs/testing-lib',
      projectNameAndRootFormat: 'as-provided',
    });

    // sanity check
    const config = readProjectConfiguration(tree, 'testing-lib');
    expect(config).toBeDefined();
  });

  it('should run successfully', async () => {
    const postProcess = await storeGeneratorGenerator(tree, {
      name: 'MyTestCase',
      directory: 'libs/testing-lib/src/lib',
      nameAndDirectoryFormat: 'as-provided',
      skipLintFix: true,
    });

    await postProcess();

    expect(tree.listChanges().map((c) => c.path)).toContain(
      'libs/testing-lib/src/lib/my-test-case.store.ts'
    );
  });
});
