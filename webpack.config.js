var path    = require('path');
var hwp     = require('html-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8080
    },
    module:{
        rules:[{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader'
        },
       {
            test: /\.css$/,  
            loader:  ['style-loader', 'css-loader']
       },
       {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }]
    },
    plugins:[
        new hwp({filename: 'index.html', template:'./index.html'}),
        new hwp({filename: 'demo.html', template:'./demo.html'})
    ]
}
