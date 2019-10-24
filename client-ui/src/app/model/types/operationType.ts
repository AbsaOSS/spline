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

import { JoinComponent } from "../../components/lineage/lineage-details/schema-details/join/join.component";
import { Type } from "@angular/core";
import { ProjectionComponent } from "../../components/lineage/lineage-details/schema-details/projection/projection.component";
import { ExpressionComponent } from "../../components/lineage/lineage-details/schema-details/expression/expression.component";
import { FilterComponent } from 'src/app/components/lineage/lineage-details/schema-details/filter/filter.component';
import { SortComponent } from 'src/app/components/lineage/lineage-details/schema-details/sort/sort.component';
import { LogicalRelationComponent } from 'src/app/components/lineage/lineage-details/schema-details/logical-relation/logical-relation.component';
import { GenericComponent } from 'src/app/components/lineage/lineage-details/schema-details/generic/generic.component';
import { AggregateComponent } from 'src/app/components/lineage/lineage-details/schema-details/aggregate/aggregate.component';


export const enum OperationType {
    Projection = 'Project',
    LogicalRelation = 'LogicalRelation',
    BatchRead = 'BatchRead',
    StreamRead = 'StreamRead',
    Join = 'Join',
    Union = 'Union',
    Generic = 'Generic',
    Filter = 'Filter',
    Sort = 'Sort',
    Aggregate = 'Aggregate',
    WriteCommand = 'WriteCommand',
    BatchWrite = 'BatchWrite',
    StreamWrite = 'StreamWrite',
    Alias = 'Alias'
}


export const ExpressionComponents: Map<string, Type<ExpressionComponent>> = new Map([
    [OperationType.Join, JoinComponent],
    [OperationType.Projection, ProjectionComponent],
    [OperationType.LogicalRelation, LogicalRelationComponent],
    [OperationType.BatchRead, ExpressionComponent],
    [OperationType.StreamRead, ExpressionComponent],
    [OperationType.Union, ExpressionComponent],
    [OperationType.Generic, GenericComponent],
    [OperationType.Filter, FilterComponent],
    [OperationType.Sort, SortComponent],
    [OperationType.Aggregate, AggregateComponent],
    [OperationType.WriteCommand, ExpressionComponent],
    [OperationType.BatchWrite, ExpressionComponent],
    [OperationType.StreamWrite, ExpressionComponent],
    [OperationType.Alias, ExpressionComponent]
])
