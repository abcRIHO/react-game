import React, { Component } from 'react';

function getNumbers() {
    // 숫자 네 개를 겹치지 않고 뽑아내는 함수
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = () => {
        
    };

    onChangeInput = () => {

    };

    render() {
        return (
            <div>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} 
                        onChange={this.onChangeInput}/>
                </form>

                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {['사과', '바나나','포도','귤','감'].map((v) => {
                        return (
                            <li>{v}</li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}