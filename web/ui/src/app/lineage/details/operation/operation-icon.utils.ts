/*
 * Copyright 2017 ABSA Group Limited
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

import {typeOfOperation} from "../../types";
import {Icon} from "../../../visjs/vis-model";
import {IComposite} from '../../../../generated-ts/operation-model';
import {IOperation} from '../../../../generated-ts/lineage-model';

export function getOperationIcon(operation: IOperation): Icon {
    let type = typeOfOperation(operation);

    if (type == 'Composite') {
        return getCompositeIcon(operation as IComposite)
    } else if (type.endsWith("Write")) {
        return getDatasetIcon(operation['destinationType']);
    } else if (type.endsWith('Read')) {
        return getDatasetIcon(operation['sourceType']);
    }

    switch (type) {
        case "Filter": return new Icon("fa-filter", "\uf0b0");
        case "Sort": return new Icon("fa-sort-amount-desc", "\uf161");
        case "Aggregate": return new Icon("fa-calculator", "\uf1ec");
        case "Join": return new Icon("fa-code-fork", "\uf126");
        case "Union": return new Icon("fa-bars", "\uf0c9");
        case "Projection": return new Icon("fa-chevron-circle-down", "\uf13a");
        case "Alias": return new Icon("fa-circle-thin", "\uf1db");
        case "Generic": return new Icon("fa-square", "\uf0c8");
        default: return null;
    }
}

export function getDatasetIcon(storageType: string): Icon {
    switch (storageType.toLowerCase()) {
        case "parquet":
        case "csv":
            return new Icon('fa-file', "\uf15b");
        case "kafka": return new Icon('icon-apache_kafka-icon', "\u0041", "Glyphter")
        case "socket": return new Icon('icon-ethernet-socket-2', "\u0042", "Glyphter");
        case "console": return new Icon('fa-terminal', "\uf120");
        default: return new Icon('fa-database', "\uf1c0")
    }
}

export function getProcessingIcon(processingType: ProcessingType): Icon {
    if (processingType == 'Stream') {
        return new Icon("icon-cogs-stream", "\u0043", "Glyphter");
    } else {
        return new Icon('fa-cogs', "\uf085");
    }
}

export function getCompositeIcon(composite: IComposite): Icon {
    if (composite.isBatchNotStream) {
        return getProcessingIcon("Batch")
    } else {
        return getProcessingIcon("Stream")
    }
}

export type ProcessingType = ( "Stream" | "Batch" )
