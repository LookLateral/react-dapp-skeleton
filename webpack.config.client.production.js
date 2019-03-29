const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    mode: "production",
    entry: [
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
        publicPath: "/dist/"
    },
    module: {
        rules: [
            /*{
                //test: /\.css$/,  
                //include: /node_modules/,  
                //use: ['style-loader', 'css-loader'],
                
                //test: /\.css$/, 
                //loader:'style!css!',

                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },*/
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    }
}

module.exports = config
