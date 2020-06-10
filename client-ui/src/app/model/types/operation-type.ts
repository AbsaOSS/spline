/*
 * Copyright 2019 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Type } from '@angular/core'
import { AggregateComponent } from 'src/app/components/lineage/lineage-details/operation-properties-details/aggregate/aggregate.component'
import { AliasComponent } from 'src/app/components/lineage/lineage-details/operation-properties-details/alias/alias.component'
import { FilterComponent } from 'src/app/components/lineage/lineage-details/operation-properties-details/filter/filter.component'
import { GenericComponent } from 'src/app/components/lineage/lineage-details/operation-properties-details/generic/generic.component'
import { LogicalRelationComponent } from 'src/app/components/lineage/lineage-details/operation-properties-details/logical-relation/logical-relation.component'
import { PropertyErrorComponent } from 'src/app/components/lineage/lineage-details/operation-properties-details/property-error/property-error.component'
import { SortComponent } from 'src/app/components/lineage/lineage-details/operation-properties-details/sort/sort.component'
import { WriteComponent } from 'src/app/components/lineage/lineage-details/operation-properties-details/write/write.component'

import { JoinComponent } from '../../components/lineage/lineage-details/operation-properties-details/join/join.component'
import { ProjectionComponent } from '../../components/lineage/lineage-details/operation-properties-details/projection/projection.component'
import { PropertiesComponent } from '../../components/lineage/lineage-details/operation-properties-details/properties/properties.component'


export const enum OperationType {
  Projection = 'Project',
  LogicalRelation = 'LogicalRelation',
  Join = 'Join',
  Union = 'Union',
  Generic = 'Generic',
  Filter = 'Filter',
  Sort = 'Sort',
  Aggregate = 'Aggregate',
  Write = 'Write',
  Alias = 'SubqueryAlias',
  Error = 'Error'
}


export const OPERATION_PROPERTY_COMPONENT_TYPE_MAP: Map<string, Type<PropertiesComponent>> = new Map([
  [OperationType.Join, JoinComponent],
  [OperationType.Projection, ProjectionComponent],
  [OperationType.LogicalRelation, LogicalRelationComponent],
  [OperationType.Union, PropertiesComponent],
  [OperationType.Generic, GenericComponent],
  [OperationType.Filter, FilterComponent],
  [OperationType.Sort, SortComponent],
  [OperationType.Aggregate, AggregateComponent],
  [OperationType.Write, WriteComponent],
  [OperationType.Alias, AliasComponent],
  [OperationType.Error, PropertyErrorComponent]
])

export function getOperationPropertiesComponentType(operationType: OperationType, operationName: string): Type<PropertiesComponent> {
  return operationType === OperationType.Write
    ? OPERATION_PROPERTY_COMPONENT_TYPE_MAP.get(OperationType.Write)
    : OPERATION_PROPERTY_COMPONENT_TYPE_MAP.get(operationName)
}
