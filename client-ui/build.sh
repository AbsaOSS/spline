#!/bin/bash
: '
  Copyright 2019 ABSA Group Limited

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
'

export NODE_OPTIONS="--max_old_space_size=8192"

echo "Building Spline UI v$SPLINE_VERSION"

# Install required Node version
. ./install-node.sh

# Install NPM dependencies
npm install --no-color

# Run Spline UI Build
npm run swagger-gen --no-color
npm run ng version
npm run ng build --prod
