# Test Doubles

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
