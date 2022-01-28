const path = require('path');
const { webpack } = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval', // hidden-source-map
    resolve: {
        extensions: ['.jsx', '.js'],
    },

    entry: {
        app: './client',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        target: {
                            browsers: ['> 1% in KR'], // browserlist
                        },
                        debug: true,
                    }], 
                    ['@babel/preset-react']],
                plugins: [],
            },
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ], // 확장 프로그램,
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist'), // 현재 폴더의 'dist'라는 폴더
    },
}