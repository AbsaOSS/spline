## Spline persistence services

### Purposes
- Creates an API layer on top of the Spline database
- Implements a custom application level distributed transaction protocol on top of the ArangoDB guarantees, to provide transaction _atomicity_ and READ_COMMITTED _isolation_ (A and I in ACID) on the cluster deployment
