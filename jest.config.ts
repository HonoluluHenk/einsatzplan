import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
  cacheDirectory: '<rootDir>/.jest-cache/<path>',
});
