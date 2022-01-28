const React = require('react');
const { useState, useRef } = React;

const GuGudan = () => {
    const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = React.useState('');
    const [result, setResult] = React.useState('');
    const InputRef = React.useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        if(parseInt(value) === first * second) {
            setResult('정답 ' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');

            InputRef.current.focus();
        }

        else {
            setResult('땡');
            setValue('');
            InputRef.current.focus();
        }  
    }
    return (
        <div>
            <div>{first} 곱하기 {second} 는? </div>
            <form onSubmit={onSubmitForm}>
                <input ref={InputRef} onChange={onChangeInput} value={value} />
                <button>입력</button>
            </form>
            <div id="result">{result}</div>
        </div>
    );
};

module.exports = GuGudan;