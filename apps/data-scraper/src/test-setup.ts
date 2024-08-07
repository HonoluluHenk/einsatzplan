// noinspection TypeScriptUnresolvedReference
function projectRootDir(): string {
  return __dirname
    .split('/')
    .slice(0, -3)
    .join('/');
}

global.projectRootDir = projectRootDir;

// noinspection TypeScriptUnresolvedReference
function fixtureFile(path: string): string {
  const projectRoot = global.projectRootDir();

  const file = `${projectRoot}/data/${path}`;
  // console.log('fixtureFile', file);
  return file;
}

global.fixtureFile = fixtureFile;
