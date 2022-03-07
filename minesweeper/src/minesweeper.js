import React, { useReducer, createContext, useMemo } from 'react';
import Form from './Form';
import Table from './table';

export const CODE = {
    // 칸에 어떻게 보일지에 따라 코드 부여
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTOIN_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
}

export const TableContext = createContext({
    tableData: [
        [-1, -1, -1, -1, -1, -1, -1],
        [-7, -1, -1, -1, -1, -1, -1],
        [],
        [],
        []
    ],
    dispatch: () => {
    }
});

const initialState = {
    tableData: [],
    timer: 0,
    result: 0,
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length, 1)[0]);
        shuffle.push(chosen);
        // 지뢰의 개수를 랜덤으로 뽑아놓고 셔플 배열에 저장
    }

    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = []
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
};

export const START_GAME = 'START_GAME';

const reducer = ( state, action ) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine)
            }

        default:
            return state;
    }
}

const MineSweeper = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({
        // useMemo를 통한 캐싱 필요
        tableData: state.tableData, dispatch
    }), [state.tableData])

    return (
        <TableContext.Provider value={value}>
            {/* MineSweeper가 리렌더링 될 때마다 객체가 새로 생김 - Context API를 쓰는 자식들도 리렌더링 */}
            <Form dispatch={dispatch} />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    )
};

export default MineSweeper;