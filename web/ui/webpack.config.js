/*
 * Copyright 2017 Barclays Africa Group Limited
 *
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

var webpack = require('webpack')
var path = require('path')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var isProd = process.env.NODE_ENV === "production"

var commonPlugins = [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
        __PRODUCTION_MODE__: isProd
    }),
    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        path.resolve(__dirname, 'doesnotexist/')
    ),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
            return module.context && module.context.indexOf('node_modules') !== -1
        }
    })
]

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'bundle.[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "assets/"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.less', '.css', '.html']
    },
    plugins: commonPlugins.concat(isProd
            ? [/* prod build plugins */]
            : [/* dev build plugins */]
    ),
    module: {
        loaders: [
            {test: /\.exec\.js$/, include: /src\/scripts/, loaders: ['script-loader']},
            {test: /\.ts$/, exclude: /node_modules/, loaders: ['awesome-typescript-loader', 'angular2-template-loader']},
            {test: /\.(html|css)$/, exclude: /node_modules/, loader: 'raw-loader'},
            {test: /\.less$/, exclude: /node_modules/, loader: 'raw-loader!less-loader'},
            {test: /\.css/, include: /node_modules/, loaders: ['style-loader', 'css-loader']},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader"},
            {test: /\.(png|gif)$/, loader: "url-loader"}
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        historyApiFallback: {
            index: '/'
        },
        hot: false,
        proxy: {
            "/rest": {
                target: "http://localhost:3004",
                pathRewrite: {"^/rest": ""}
            }
        }
    }
}