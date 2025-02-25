import {
  formatFiles,
  Tree,
} from '@nx/devkit';
import { MyGeneratorGeneratorSchema } from './schema';
import {applicationGenerator, UnitTestRunner} from '@nx/angular/generators';
import { Linter } from '@nx/eslint';

export async function myGeneratorGenerator(
  tree: Tree,
  options: MyGeneratorGeneratorSchema
) {
  await applicationGenerator(tree, {
    directory:options.name,
    skipFormat: true,
    e2eTestRunner: options.e2eTestRunner,
    unitTestRunner: UnitTestRunner.Jest,
    linter: Linter.EsLint,
    standalone: false,
	});
  await formatFiles(tree);
}

export default myGeneratorGenerator;
