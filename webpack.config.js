const env = process.env.NODE_ENV || "dev";
const autoprefixer = require("autoprefixer");
const extractText = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const extractCss = new extractText({
    filename: "assets/styles.css",
});
const extractHtml = new HtmlPlugin ({
    template: "index.html"
});


//dir src is for resource files
const srcDir = __dirname + "/src";
//dir dist is for resulting files
const distDir = __dirname + "/dist";

module.exports = {
    devtool: env === "dev" ? "source-map" : null,
    context: srcDir,
    entry: [
        "./app.js"
    ],
    output: {
        filename: "assets/bundle.js",
        path: distDir,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: 'assets/[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        autoprefixer,
        extractCss,
        extractHtml
    ]
};

if(env === "production") {
    modules.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /.*\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    );
}
