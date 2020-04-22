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
      pages: path.resolve(__dirname,'src/pages/')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
    ]
  },
  devServer: {
    port:8082,
    hot: true,
    proxy: {
      '/api/': 'http://localhost:3001/'
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html"
    })
  ]
};
