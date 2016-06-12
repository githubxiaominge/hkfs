var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack=require("webpack")
module.exports = {
  plugins: [new ExtractTextPlugin("[name].style.css"),
             new webpack.ProvidePlugin({$: 'jquery'})//使jquery变成全局变量，无须require('jquery')
            /* new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')//第三方库打包生成的文件*/

  ],
  entry: {
    index: 'javascripts/test.js',//以root为基准
    /*vendor:['jquery']//类库入口*/
  },
  output: {
    path: 'build/',//以配置文件为基准
    publicPath: "build",
    filename: '[name].bundle.js'
  },
  resolve: {
/*    root: 'F:/workspace/git/hkfs/public', //绝对路径(查找module开始路径)*/
    root:__dirname,
    extensions: ['', '.js', '.jsx']
  },

  /*  externals: {
   jquery: 'jQuery'
   },*/

  module: {
    loaders: [
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
     /* {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },*/
      {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract( 'css?sourceMap!' + 'less?sourceMap')},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  }
};
