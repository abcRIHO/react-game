import React, { useState, useRef, useEffect } from 'react';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => { // computer가 어떤 손을 냈는지 판단
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setimgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const interval = useRef();

  useEffect(() => {
    // compoentDidMount, componentDidUpdate 역할 (1:1 대응은 X)
    interval.current = setInterval(changeHand, 500);
    return () => {
      // componentWillUnmount 역할
      clearInterval(interval.current);
    }
  }, [imgCoord]); // useEffect를 실행하고 싶은 state

  const changeHand = () => {
      if (imgCoord === rspCoords.바위) {
        setimgCoord(rspCoords.가위); 
      } else if (imgCoord === rspCoords.가위) {
        setimgCoord(rspCoords.보); 
      }
      else if (imgCoord === rspCoords.보) {
        setimgCoord(rspCoords.바위); 
      }
  }

  const onClickBtn = (choice) => () => {
    // if (interval.current) {
      
    // }
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult('비겼습니다!');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('졌습니다!');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand);
    }, 1000);
  };

    // imgCoord : 이미지의 좌표
      return(
        <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
      </>
    );
}

// class RSP extends Component { 
//   state = {
//     result: '',
//     imgCoord: '0',
//     score: 0,
//   }

//   interval;

//   // 라이프사이클
//   // constructor -> render -> ref -> ComponentDidMount -> 
//   // (setState/props 바뀔 때 -> shouldComponentUpdate -> render -> componentDidUpdate)
//   // 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

//   componentDidMount() { // 컴포넌트 첫 렌더링 후 비동기 요청
//     this.interval = setInterval(this.changeHand, 100)
//     // 최초 1번만 실행.
//     // 주로 비동기 요청
//   }

//   componentWillUnmount() {
//     // 컴포넌트가 제거되기 직전
//     // 비동기 요청 정리
//     clearInterval(this.interval);
//   }
  
//   changeHand = () => {
//       const {imgCoord} = this.state;
//       if (imgCoord === rspCoords.바위) {
//         this.setState({
//           imgCoord: rspCoords.가위,
//         });   
//       } else if (imgCoord === rspCoords.가위) {
//         this.setState({
//           imgCoord: rspCoords.보,
//         });
//       }
//       else if (imgCoord === rspCoords.보) {
//         this.setState({
//           imgCoord: rspCoords.바위,
//         });
//       }
//   }

//   onClickBtn = (choice) => (e) => {
//     e.preventDefault();
//     const {imgCoord} = this.state;

//     clearInterval(this.interval);
//     const myScore = scores[choice];
//     const cpuScore = scores[computerChoice(imgCoord)];
//     const diff = myScore - cpuScore;
//     if (diff === 0) {
//       this.setState({
//         result: '비겼습니다!',
//       }) 
//     } else if ([-1, 2].includes(diff)) {
//       this.setState((prevState) => {
//         return {
//           result: '이겼습니다!',
//           score: prevState.score + 1,
//         }
//       });
//     } else {
//       this.setState ((prevState) => {
//         return {
//           result: '졌습니다!',
//           score: prevState.score -1,
//         };
//       });
//     }
//     setTimeout(() => {
//       this.interval = setInterval(this.changeHand);
//     }, 1000);
    
//   };

//   render() { 
//     const { result, score, imgCoord } = this.state;
//     // imgCoord : 이미지의 좌표
//       return(
//         <>
//         <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
//         <div>
//           <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
//           <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
//           <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
//         </div>
//         <div>{result}</div>
//         <div>현재 {score}점</div>
//       </>
//     );
//   }
// }

export default RSP;