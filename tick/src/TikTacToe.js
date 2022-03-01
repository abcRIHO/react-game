import React, { useState, useReducer, useCallback, useEffect } from 'react';
import Table from './table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      recentCell: [-1, -1], // 최근 눌렀던 셀 기억
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
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
                recentCell: [action.row, action.cell], // 최근 클릭 셀 기억
            }

        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }

        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                  ],
            };
        }
        default:
            return state;
    }
};

const TikTacToe = () => {
    // state는 부모인 TikTacToe에서 관리
    // useReducer -> state를 관리해주는 Hooks
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    const onClickTable = useCallback(() => {
        // 컴포넌트에 들어가는 함수들은 useCallback
        dispatch({ type: SET_WINNER, winner: '0' }) 
        // dispatch 내부에 들어가면 action 객체
    }, []);

    useEffect(() => {  
        let win = false;
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true; // 가로줄 검사
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true; // 세로줄 검사 
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true; // 대각선 검사 
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true; // 대각선 검사
        }

        if (win) { // 승리 시
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            // 무승부 검사
            let all = true; // all이 true면 무승부라는 뜻 
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                        // 하나라도 안 찬 칸이 있다면 무승부가 아님
                    }
                })
            });
            if (all) {
                dispatch({ type: RESET_GAME });
            } else {
                // 무승부가 아니라면 턴을 넘김
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [tableData]);

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
            {state.winner && <div>{state.winner} 님의 승리</div>}

        </>  
    )
};

export default TikTacToe;
