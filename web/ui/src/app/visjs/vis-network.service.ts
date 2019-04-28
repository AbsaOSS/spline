/*
 * Copyright 2019 ABSA Group Limited
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
import {Injectable} from "@angular/core";
import * as vis from "vis";
import {OnDestroy} from "@angular/core/src/metadata/lifecycle_hooks";

@Injectable()
export class VisNetworkService implements OnDestroy {
    private _network?: vis.Network

    public get network(): vis.Network | undefined {
        return this._network
    }

    public createNetwork(networkCreatorFn: () => vis.Network): vis.Network {
        this.clearNetwork()
        this._network = networkCreatorFn()
        return this._network
    }

    public ngOnDestroy(): void {
        this.clearNetwork()
    }

    private clearNetwork() {
        if (this._network) {
            this._network.destroy()
        }
    }
}