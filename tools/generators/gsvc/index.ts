import { join } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';
import { getProjectConfig } from '@nrwl/workspace';
import * as strings from '@nrwl/workspace/src/utils/strings';

export default function (schema: any) {
  console.log('');
  console.log('走你 ┏ (゜ω゜)=☞');
  return (tree: Tree, context: SchematicContext) => {
    const config = getProjectConfig(tree, schema.project);
    schema.path ||= join(config.sourceRoot, config.projectType === 'application' ? 'app' : 'lib');
    return chain([
      externalSchematic('@schematics/angular', 'service', {
        name: schema.name,
        project: schema.project,
        path: schema.path,
        skipTests: true,
        style: 'scss'
      }),
      applyNewTemplate(schema)
    ])(tree, context);
  };
}

function applyNewTemplate(schema: any) {
  return mergeWith(
    apply(url('./files'), [
      applyTemplates({
        name: schema.name,
        dasherize: strings.dasherize,
        classify: strings.classify
      }),
      move(schema.path)
    ]),
    MergeStrategy.Overwrite
  );
}
