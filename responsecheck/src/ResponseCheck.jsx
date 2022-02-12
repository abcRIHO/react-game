import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);

    const timeOut = useRef(null);
    const startTime = useRef(); // 화면은 바꾸고 싶지 X
    const endTime = useRef();

    const onReset = () => {
        setResult('');
    };

    const onClickScreen = () => { 
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
            
            timeOut.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');

                startTime.current = new Date(); // Ref에 기록
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤

        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(timeOut);
            setState('waiting');
            setMessage('성급하시네요! 초록색이 된 후에 클릭하세요.');

        } else if (state === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setResult((prevResult) => { 
                return [...prevResult, endTime.current - startTime.current];
            });
            setMessage('클릭해서 시작하세요');
        }
    }
    const renderAverage = () => {
        return (result.length === 0 
            ? null :
            <>
                <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>)
    }

    return (
        <>
            <div id="screen" className={state}
            onClick={onClickScreen}>
                {message}
            </div>

            {renderAverage()}
        </>
    )
}

export default ResponseCheck;

// class ResponseCheck extends Component {
//     state = { 
//         state: 'waiting',
//         message: '클릭해서 시작하세요',
//         result: [],
//     };

//     timeout;
//     startTime;
//     endTime;

//     onReset = () => {
//         this.setState({
//             result: [],
//         });
//     };

//     onClickScreen = () => { 
//         const { state, message, result } = this.state;
//         if (state === 'waiting') {
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이 되면 클릭하세요'
//             });
//             this.timeout = setTimeout(() => {
//                 this.setState({
//                     state: 'now',
//                     message: '지금 클릭',
//                 });

//                 this.startTime = new Date();

//             }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
//         } else if (state === 'ready') { // 성급하게 클릭
//             clearTimeout(this.timeout);
//             this.setState({
//                 state: 'waiting',
//                 message: '성급하시네요! 초록색이 된 후에 클릭하세요.'
//             })
//         } else if (state === 'now') {
//             this.endTime = new Date();
//             this.setState((prevState) => {
//                 return {
//                     state: 'waiting',
//                     result: [...prevState.result, this.endTime - this.startTime],
//                     message: '클릭해서 시작하세요'
//                 };
//             });
//         }
//     }
//     renderAverage = () => {
//         const { result } = this.state;
//         return this.state.result.length !== 0 
//             &&
//             <>
//                 <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
//                 <button onClick={this.onReset}>리셋</button>
//             </>
//     }

//     render() {
//         const { state, message } = this.state;
//         return (
//             <>
//                 <div id="screen" className={this.state.state}
//                 onClick={this.onClickScreen}>
//                     {this.state.message}
//                 </div>
//                 {this.renderAverage()}
//             </>
//         )
//     }
// }