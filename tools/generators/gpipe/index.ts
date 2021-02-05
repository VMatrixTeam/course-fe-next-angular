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
    throw new Error(`Pipe 名称必须以 'app-' 为开头`);
  }

  console.log('');
  console.log('走你 ┏ (゜ω゜)=☞');
  return (tree: Tree, context: SchematicContext) => {
    const config = getProjectConfig(tree, schema.project);
    schema.path ||= join(config.sourceRoot, config.projectType === 'application' ? 'app' : 'lib');
    return chain([
      externalSchematic('@schematics/angular', 'pipe', {
        name: schema.name,
        project: schema.project,
        path: schema.path,
        skipTests: true
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
        classify: strings.classify,
        camelize: strings.camelize
      }),
      move(`${schema.path}/${schema.name}`)
    ]),
    MergeStrategy.Overwrite
  );
}
