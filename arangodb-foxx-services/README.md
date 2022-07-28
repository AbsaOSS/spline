# Spline Foxx Service

---

## Build

```bash
mvn clean install
```

## (re-)deploy

```shell
# Deploy the "/spline" service to the "foo" database on the given ArangoDB server
# (http://some.server:1234/_db/foo/spline/)
npm foxx:deploy --database=foo --server=http://some.server:1234

# If the "--service" option is omitted, the local server is used
# (http://localhost:8529/_db/foo/spline/)
npm foxx:deploy --database=foo

# If needed, in addition to the "foxx:deploy" script that executes build, uninstall and install steps,
# you can also use individual "foxx:install" or "foxx:uninstall" scripts with the same arguments.
npm foxx:uninstall --database=NAME [--server=URL]
npm foxx:install --database=NAME [--server=URL]
```

---

    Copyright 2019 ABSA Group Limited

    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
