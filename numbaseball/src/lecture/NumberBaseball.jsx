import React, { useState } from 'react';
import Try from './Try';

function getNumbers() {
    // 숫자 네 개를 겹치지 않고 뽑아내는 함수
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i+= 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setVaule] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState('');

    const onSubmitForm = (e) => {
        e.preventDefault();
        // 화살표 함수를 안 쓰면 this 사용 불가 (undefined)
        if(value === answer.join('')) {
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, { try: value, result: '홈런!'}]
            });

            alert('신규 게임 시작');
            setVaule('');
            setAnswer(getNumbers());
            setTries([]);

        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v))
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { // 10번 이상 틀렸을 때
                
                setResult(`10번 이상 실패! 답은 ${answer.join(',')}이었습니다.`);

                alert('신규 게임 시작')
                setVaule('');
                setAnswer(getNumbers());
                setTries([]);

            } else {
                for (let i = 0; i <4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    }

                    else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }

                setTries((prevTries) => [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],)
                setVaule('');
            }
        }
    };

    const onChangeInput = (e) => {
        setVaule(e.target.value);
    };;

    return (
        <div>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} 
                    onChange={onChangeInput}/>
            </form>

            <div>시도: {tries.length}</div>

            <ul>
                {tries && tries.map((v, i) => {
                    return (
                        <Try key={`${i + 1}차 시도`} tryInfo={v} />
                    )
                })}
            </ul>
        </div>
    );
}

export default NumberBaseball;