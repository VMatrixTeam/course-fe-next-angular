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
  return (tree: Tree, context: SchematicContext) => {
    const config = getProjectConfig(tree, schema.project);
    schema.path ||= join(config.sourceRoot, config.projectType === 'application' ? 'app' : 'lib');
    return chain([
      externalSchematic('@schematics/angular', 'component', {
        name: schema.name,
        project: schema.project,
        path: schema.path,
        skipTests: true,
        style: 'css'
      }),
      applyNewTemplate(schema)
    ])(tree, context);
  };
}

function applyNewTemplate(schema: any) {
  return mergeWith(
    apply(url('./files'), [
      applyTemplates({
        selector: schema.selector,
        name: schema.name,
        dasherize: strings.dasherize,
        classify: strings.classify
      }),
      move(`${schema.path}/${schema.name}`)
    ]),
    MergeStrategy.Overwrite
  );
}
