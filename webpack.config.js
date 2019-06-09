const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, options) => {
    const showAnalyzer = options.analyzer ? true : false;
    const production = (process.env.NODE_ENV == 'production') || (options.mode == 'production')
    const settings = {
        entry: "./src/index.tsx",
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
        },
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: '[name].[contenthash].js',
            publicPath: '/'
        },
        devtool: 'sourcemap',
        devServer: {
            historyApiFallback: true,
            watchOptions: {
                poll: true
            },
            publicPath: '/'
        },
        resolve: {
            alias: {
                App: path.resolve(__dirname, 'src/app/'),
                Actions: path.resolve(__dirname, 'src/redux/actions/'),
                Api: path.resolve(__dirname, 'src/redux/api/'),
                Constants: path.resolve(__dirname, 'src/constants/'),
                Layouts: path.resolve(__dirname, 'src/layouts/'),
                Reducers: path.resolve(__dirname, 'src/redux/reducers/'),
                ReduxConstants: path.resolve(__dirname, 'src/redux/constants/'),
                Routes: path.resolve(__dirname, 'src/routes/'),
                Enums: path.resolve(__dirname, 'src/enums/'),
                Utilities: path.resolve(__dirname, 'src/utilities/'),
            },
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader",
                    exclude: [
                        /node_modules/,
                        /public/
                    ]
                },
                {
                    enforce: "pre",
                    test: /\.js$/, loader: "source-map-loader"
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader"
                        },
                        {
                            loader: "eslint-loader"
                        }
                    ]
                },
                {
                    test: /\.(css|scss)/,
                    use: [
                        {
                            loader: production ? MiniCssExtractPlugin.loader : 'style-loader' ,
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader'
                    }
                }
            ]
        },
        plugins: [
            new CompressionPlugin({
                algorithm: 'gzip'
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[name].[id].css",
            }),
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "index.html"
            }),
            new CopyPlugin([
                { from: 'media', to: 'media' },
            ]),
        ],
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `npm.${packageName.replace('@', '')}`;
                        },
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(css|scss)$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            }
        }
    }
    if (showAnalyzer) {
        settings.plugins.push(new BundleAnalyzerPlugin());
    }
    return settings;
}