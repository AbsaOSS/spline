## Run Spline Migration from 0.3 to 0.4+

In order to migrate the date from mongodb to arangodb you can use Spline Migrator Tool. 

-   To list the options you can run the command:  `java -jar migrator-tool.jar --help` 

```
Usage: migrator-tool [options]

  -s, --source <url>       MongoDB connection URL containing Spline (ver < 0.4) data to be migrated
  -t, --target <url>       Spline Producer REST endpoint URL - a destination for migrated data
  -e, --failrec <file>     A file where a list of failed lineage IDs will be written to.
Running migrator with the option '-r' will repeat attempt to migrate lineages from this file.
  -r, --retry-from <file>  A failrec file (see option '-e') to retry from.
  -b, --batch-size <value>
                           Number of lineages per batch. (Default is 100)
  -n, --batch-max <value>  Number of batches to process. Negative value means unbounded. (Default is -1)
  -c, --continuous         Watch the source database and migrate the incoming data on the fly
  -l, --log-level <value>  Log level (`ALL`, `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `OFF`). Default is `ERROR`
  --help                   prints this usage text

```

-   Example: `java -jar migrator-tool/target/migrator-tool.jar --source=mongodb://localhost:27017/splinedb --target=http://localhost:8080/spline/producer`


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
