import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { myGeneratorGenerator } from './my-generator';
import { MyGeneratorGeneratorSchema } from './schema';
import { E2eTestRunner } from '@nx/angular/generators';
import { TempFs } from '../testing-utils/temp-fs';

// This is in the nx/angular repo unit test for the Angular application generator, it doesn't help
jest.mock('@nx/devkit', () => {
  const original = jest.requireActual('@nx/devkit');
  return {
    ...original,
    ensurePackage: (pkg: string) => jest.requireActual(pkg),
    createProjectGraphAsync: jest.fn().mockResolvedValue({
      nodes: {},
      dependencies: {},
    }),
  };
});

describe('my-generator generator', () => {
  let tree: Tree;
  let tempFs: TempFs;
  let cwd = process.cwd();

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tempFs = new TempFs('test');
    tempFs.createFileSync("nx.json", `{"$schema": "./node_modules/nx/schemas/nx-schema.json", "plugins": []}`)
    tree.write("nx.json", `{"$schema": "./node_modules/nx/schemas/nx-schema.json", "plugins": []}`)
    tree.root = tempFs.tempDir
    process.chdir(tree.root);
  });

  afterEach(() => {
    tempFs.reset();
    process.chdir(cwd);
  })

  it('none', async () => {
    const options: MyGeneratorGeneratorSchema = { name: 'plain-app',e2eTestRunner: E2eTestRunner.None };

    await myGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'plain-app');
    expect(config).toBeDefined();
  });

  it('cypress', async () => {
    const options: MyGeneratorGeneratorSchema = { name: 'cypress-app',e2eTestRunner: E2eTestRunner.Cypress };

    await myGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'cypress-app');
    expect(config).toBeDefined();
  });

  it('playwright', async () => {
    const options: MyGeneratorGeneratorSchema = { name: 'playwright-app',e2eTestRunner: E2eTestRunner.Playwright };

    await myGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'playwright-app');
    expect(config).toBeDefined();
  });
});
