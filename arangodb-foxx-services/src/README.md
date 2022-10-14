## Spline persistence services

### Purposes
- Creates an API layer on top of the Spline database
- Implements a custom application level distributed transaction protocol on top of the ArangoDB guarantees, to provide transaction _atomicity_ and READ_COMMITTED _isolation_ (A and I in ACID) on the cluster deployment

### Build information

**Version**: @VERSION@\
**Revision**: @REVISION@\
**Timestamp**: @BUILD_TIMESTAMP@

---

    Copyright 2022 ABSA Group Limited

    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
