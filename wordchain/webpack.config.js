const path = require('path');

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
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }]
    },

    output: {
        path: path.join(__dirname, 'dist'), // 현재 폴더의 'dist'라는 폴더
        filename: 'app.js',
    }, // 출력
}