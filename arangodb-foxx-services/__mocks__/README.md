## Test Doubles

This directory contains _mocks_, _fakes_ and other  [test doubles](https://martinfowler.com/bliki/TestDouble.html)
for _external_ dependencies (node modules) required for the given Foxx module unit tests, run by [Jest](https://jestjs.io/) test runner.

(See [Mocking Node modules](https://jestjs.io/docs/manual-mocks#mocking-node-modules))

### @arangodb

_Fake_ implementation (reduced version of [this](https://github.com/arangodb/arangodb/blob/v3.9.5/js/common/modules/@arangodb/common.js#L56)) of the [arangodb.aql](https://www.arangodb.com/docs/stable/appendix-java-script-modules-arango-db.html#the-aql-template-tag)
template string handler, including associated helper functions like
[aql.literal](https://www.arangodb.com/docs/stable/appendix-java-script-modules-arango-db.html#the-aqlliteral-helper),
[aql.join](https://www.arangodb.com/docs/stable/appendix-java-script-modules-arango-db.html#the-aqljoin-helper) etc.

### @arangodb/locals

A partial _stub_ of the [@arangodb/locals](https://www.arangodb.com/docs/stable/foxx-reference-modules.html#the-arangodblocals-module)


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
