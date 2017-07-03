import { join } from 'path'

const include = join(__dirname, 'src')

export default {
  entry: './src/index.js',
  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', include}
    ]
  }
}