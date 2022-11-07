/*
 * Copyright 2022 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const Glob = require('glob')
const CopyPlugin = require('copy-webpack-plugin')

const dist = `${__dirname}/target/dist`

module.exports = {
    mode: 'production',
    target: 'node',
    entry: {
        'main/index': './src/main/index.ts',
        'scripts/setup': './src/scripts/setup.ts',
        'scripts/teardown': './src/scripts/teardown.ts',
        ...(Object.fromEntries(
            Glob.sync(`./src/aql/*.ts`, {'ignore': ['./src/aql/example.func.ts']})
                .map(path => [/.\/src\/(.*)\.ts/.exec(path)[1], path])
        )),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './src/assets',
                    to: `${dist}/assets`
                },
                {
                    from: '*',
                    context: 'src',
                    to: dist,
                    transform(content) {
                        return content
                            .toString()
                            .replace('@VERSION@', process.env.npm_package_version)
                            .replace('@REVISION@', process.env.SPLINE_BUILD_REVISION)
                            .replace('@BUILD_TIMESTAMP@', process.env.SPLINE_BUILD_TIMESTAMP)
                    },
                },
            ],
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        libraryTarget: 'commonjs2',
        filename: '[name].js',
        path: dist,
    },
    devtool: 'source-map',
    externals: [
        /^@arangodb(\/|$)/,
        'joi',
    ],
    optimization: {
        minimize: true,
    },
}
