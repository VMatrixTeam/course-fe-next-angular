import { join } from '@angular-devkit/core';
import {
  apply,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  url,
  applyTemplates,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';
import { getProjectConfig } from '@nrwl/workspace';
import * as strings from '@nrwl/workspace/src/utils/strings';

export default function (schema: any) {
  if (!schema.name.startsWith('app-')) {
    throw new Error(`Directive 名称必须以 'app-' 为开头`);
  }

  console.log('');
  console.log('走你 ┏ (゜ω゜)=☞');
  return (tree: Tree, context: SchematicContext) => {
    const config = getProjectConfig(tree, schema.project);
    schema.path ||= join(config.sourceRoot, config.projectType === 'application' ? 'app' : 'lib');
    return chain([
      externalSchematic('@schematics/angular', 'directive', {
        name: schema.name,
        project: schema.project,
        path: schema.path,
        skipTests: true,
        export: schema.export
      }),
      applyNewTemplate(schema),
      appendExportInIndex(schema, config)
    ])(tree, context);
  };
}

function applyNewTemplate(schema: any) {
  return mergeWith(
    apply(url('./files'), [
      applyTemplates({
        name: schema.name,
        dasherize: strings.dasherize,
        classify: strings.classify,
        camelize: strings.camelize
      }),
      move(schema.path)
    ]),
    MergeStrategy.Overwrite
  );
}

function appendExportInIndex(schema, config) {
  return (tree: Tree) => {
    if (schema.export) {
      const indexPath = `${config.sourceRoot}/index.ts`;
      const exportContent = tree.read(indexPath).toString();
      tree.overwrite(
        indexPath,
        `${exportContent}${exportContent.endsWith('\n') ? '' : '\n'}export * from './lib/${schema.name}.directive'\n`
      );
    }
    return tree;
  };
}
