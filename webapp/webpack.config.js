const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/App.ts'],
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json",".css"],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      apis: path.resolve(__dirname, 'src/apis/'),
      pages: path.resolve(__dirname,'src/pages/'),
      img: path.resolve(__dirname,'src/img/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.m\.css$/,
        loader :'style-loader!css-loader?modules'
      },
      {
        test: /[^m]\.css$/,
        use : [ 'style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude:[
          path.resolve(__dirname, "src/components/MDEditor/img")
        ],
        loader: 'file-loader',
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, "src/components/MDEditor/img")
        ],
        use: 'raw-loader'
      }
    ]
  },
  devServer: {
    port:8082,
    hot: true,
    proxy: {
      '/api/': 'http://localhost:3001/'
    },
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html"
    })
  ]
};
