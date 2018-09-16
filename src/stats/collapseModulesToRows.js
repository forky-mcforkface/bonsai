/**
 * @flow
 */

import type {
  ExtendedModule,
  RowRepresentation,
} from '../types/Stats';
import type { ExtendedModulesById } from './getExtendedModulesById';

import getModulesById from './getModulesById';
import flatten from '../utils/flatten';

function collectSingleChildrenOf(
  modulesById: ExtendedModulesById,
  module: ExtendedModule,
): Array<ExtendedModule> {
  return flatten(
    module.requirements.map((requiredModule) => {
      const eReqModule = modulesById[requiredModule.id];

      if (eReqModule && eReqModule.requiredByCount === 1) {
        return [
          eReqModule,
          ...collectSingleChildrenOf(modulesById, eReqModule)
        ];
      } else {
        return [];
      }
    })
  );
}

export default function(
  modules: Array<ExtendedModule>,
): Array<RowRepresentation> {
  const modulesById = getModulesById(modules);

  return modules.filter((eModule) => {
    return eModule.requiredByCount !== 1;
  }).map((eModule) => {
    const records = [eModule, ...collectSingleChildrenOf(modulesById, eModule)];
    return {
      displayModule: eModule,
      records: records,
      collapsedSizeBytes: records.reduce((sum, eModule) => sum + eModule.size, 0),
    };
  });
}
