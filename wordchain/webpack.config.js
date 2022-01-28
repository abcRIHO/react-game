const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'], // 웹팩이 알아서 확장자를 찾아준다!
    },

    // 중요
    entry: {
        app: ['./client.jsx', './WordRelay.jsx'],
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?/, // js , jsx 파일에 rule 적용
            loader: 'babel-loader', 
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR'], // browserlist
                        },
                        debug: true,
                    }], 
                    ['@babel/preset-react'],
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            },
        }],
    },

    plugins: [
        new RefreshWebpackPlugin(),
    ],

    output: {
        path: path.join(__dirname, 'dist'), // 현재 폴더의 'dist'라는 폴더
        filename: 'app.js',
        publicPath: '/dist/',
    }, // 출력

    devServer: { // 변경점을 감지함
        devMiddleware: {
            publicPath: '/dist',
        },
        static: { directory: path.resolve(__dirname) },
        hot: true,
    },
};