const { useState, useRef } = require('react');
const React = require('react');
const { Component } = React; 
// 파일에서 필요로 하는 패키지 및 라이브러리

const WordRelay = () => {
    const [word, setWord] = useState('김밥');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setResult('딩동댕');
            setValue('');
            setWord(value);

            inputRef.current.focus();
        }  
        else {
            setResult('땡');
            setValue('');

            inputRef.current.focus();
        }
    }
    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

        return (
            <>
                <div>{word}</div>
                <form onSubmit={onSubmitForm}>
                    <label htmlFor="wordInput">글자를 입력하세요.</label>
                    <input id="wordInput" className='wordInput' ref={inputRef} value={value}
                        onChange={onChangeInput} />
                    <button>입력</button>
                </form>
                <div>{result}</div>
            </>
        )
    }

module.exports = WordRelay;
// 현재 컴포넌트를 바깥에서도 사용할 수 있도록