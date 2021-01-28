import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/angular/src/schematics/library/library';

export default async function (tree: Tree, schema: any) {
  await libraryGenerator(tree, {
    name: schema.name,
    directory: schema.directory,
    tags: `${schema.tags},type:${schema.type}`,
    simpleModuleName: true,
    style: 'css',
    strict: true,
    unitTestRunner: 'none',
    linter: 'eslint',
    selector: 'app'
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
