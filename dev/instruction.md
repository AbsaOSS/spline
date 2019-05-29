#Scala cross version

Default scala version is **2.11**.

In order to change scala major version you should run from **project base dir**: `./dev/change-scala-version.sh <2.11 or 2.12>`

This script will:
 1. replace all artifactIds to include the correct version. 
 2. it will replace `scala.binary.version` to the right version.
 3. it will activate/deactivate the adapter profiles (eg. for Scala 2.12 it will activate only 2.4 version)
 
 When compiling for `Scala-2.12` maven should be run with -P!tools so the `migrator-tool` will not run.
 