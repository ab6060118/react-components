const Webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const plugins = [
  new CleanWebpackPlugin(__dirname + '/dist'),
  new HtmlWebpackPlugin( {
    title: 'Hello',
    template: __dirname + '/src/index.html'
  }),
  new ExtractTextPlugin({
    filename: "[name]/style.css",
    disable: process.env.NODE_ENV !== "prod"
  }),
  new Webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js',
    minChunks: (module) => {
      var context = module.context;
      if (typeof context !== 'string') {
        return false;
      }
      return context.indexOf('node_modules') !== -1;
    }
  }),
]

module.exports = {
  // entry: __dirname + "/src/index.tsx",
  entry: {
    "index": './src/index.tsx',
    "scrollbar":  './src/components/scrollbar/index.tsx',
    "table":  './src/components/table/index.tsx',
    "function_info":  './src/components/function_info/index.tsx',
    "dropdown":  './src/components/dropdown/index.tsx',
    "window_container":  './src/components/window_container/index.tsx',
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name]/index.js",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: process.env.NODE_ENV === 'prod' ? undefined : "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  plugins: plugins,

  devServer: {
    host: '0.0.0.0',
    port: '8080',
    hot: true,
  }
};
