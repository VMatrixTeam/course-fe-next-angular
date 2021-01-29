import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/angular/src/schematics/library/library';
import { dasherize } from '@nrwl/workspace/src/utils/strings';

const TYPE_PREFIX_MAP = {
  'data-access': 'data-',
  feature: 'feature-',
  ui: 'ui-',
  util: 'util-'
};

export default async function (tree: Tree, schema: any) {
  const prefixToCheck = TYPE_PREFIX_MAP[schema.type];
  if (!schema.name.startsWith(prefixToCheck)) {
    throw new Error(`类型为 '${schema.type}' 的库的名称必须以 '${prefixToCheck}' 开头`);
  }

  let scope;
  if (schema.scope) {
    scope = schema.scope;
  } else {
    scope = dasherize(schema.name);
    if (schema.directory) {
      scope = `${dasherize(schema.directory)}-${scope}`;
    }
  }

  await libraryGenerator(tree, {
    name: schema.name,
    directory: schema.directory,
    tags: `scope:${scope},type:${schema.type}${schema.tags ? `,${schema.tags}` : ''}`,
    simpleModuleName: true,
    style: 'css',
    strict: true,
    unitTestRunner: 'none',
    linter: 'eslint',
    prefix: 'app'
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
