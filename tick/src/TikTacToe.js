import React, { useState, useReducer, useCallback } from 'react';
import Table from './table';

const initialState = {
    winner: '',
    turn: '0',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
// action의 이름은 변수로 선언

const reducer = (state, action) => {
    // state를 어떻게 바꿀 것인지
    // action을 dispatch(실행)할 때마다 reducer 실행
    switch (action.type) {
        // action.type으로 어떤 액션인지 구분
        case SET_WINNER: 
        return {
            ...state, // 기존 state 얕은 복사
            winner: action.winner,
            // state를 어떻게 바꿀 것인지 return에서 기술
            // state.winner = action.winner; 이렇게 직접 변경은 XXX
            // 새로운 객체를 만들어서 바뀐 값만 바꾸어주어야 함
        };

        case CLICK_CELL:
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            // immer라는 라이브러리로 가독성 해결 가능
            // 객체가 있으면 얕은 복사를 해주어야 한다.
            return {
                ...state,
                tableData,
            }

        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }


        default:
    }
};

const TikTacToe = () => {
    // state는 부모인 TikTacToe에서 관리
    // useReducer -> state를 관리해주는 Hooks
    const [state, dispatch] = useReducer(reducer, initialState);

    const onClickTable = useCallback(() => {
        // 컴포넌트에 들어가는 함수들은 useCallback
        dispatch({ type: SET_WINNER, winner: '0' }) 
        // dispatch 내부에 들어가면 action 객체
    }, []);

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
            {state.winner && <div>{state.winner} 님의 승리</div>}

        </>  
    )
};

export default TikTacToe;
