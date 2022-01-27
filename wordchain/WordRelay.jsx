const React = require('react');
const { Component } = React; 
// 파일에서 필요로 하는 패키지 및 라이브러리

class WordRelay extends React.Component {
    state = {
        text: 'hello, webpack',
    };
    render() {
        return (
            <div>
               <h1> {this.state.text} </h1>
            </div>

        )
    }
}

module.exports = WordRelay;
// 현재 컴포넌트를 바깥에서도 사용할 수 있도록