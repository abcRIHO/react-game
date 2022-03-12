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
    tableData: [],
    halted: true,
    dispatch: () => {
    }
});

const initialState = {
    tableData: [],
    timer: 0,
    result: 0,
    halted: true
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
        // 지뢰의 개수를 랜덤으로 뽑아놓고 셔플 배열에 저장
    }

    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = []
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
            // 모든 칸 닫힘
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
      }
    
      console.log(data);
      return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = ( state, action ) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
            }

        case OPEN_CELL:
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]];
            });
            
            const checkAround = (row, cell) => {
                let around = [];

                if (tableData[row - 1]) {
                    around = around.concat(
                        tableData[row - 1][cell -1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1],
                    );
                };
                around = around.concat (
                    tableData[row + 1][cell - 1],
                    tableData[row][cell + 1],
                );
                if (tableData[row + 1]) {
                    around = around.concat(
                        tableData[row + 1][cell - 1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell + 1],
                    );
                }
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                console.log(around, count);
                tableData[action.row][action.cell] = count;
                if (count === 0) {
                    const near = [];
                    if (row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);
                    if (row + 1 > tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }
                    near.filter().forEach((n) => {
                        checkAround(n[0], n[1]);
                    })
                } else {

                }
                return {
                    ...state,
                    tableData,
                }
            }
            checkAround(action.row, action.i);
            tableData[action.row][action.cell] = CODE.OPENED;
            // 클릭한 cell이 opened로 변경되도록
 
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            // 클릭한 칸을 CLICKED_MINE으로 변경
            return {
                ...state,
                tableData,
                halted: true, // 게임 중단
            }
        };
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            }
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
              tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
              tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
              ...state,
              tableData,
            };
          }

          case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
              tableData[action.row][action.cell] = CODE.MINE;
            } else {
              tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
              ...state,
              tableData,
            };
          }
          

        default:
            return state;
    }
}

const MineSweeper = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state;
    const value = useMemo(() => ({
        // useMemo를 통한 캐싱 필요
        tableData, halted, dispatch
    }), [tableData, halted]);

    return (
        <TableContext.Provider value={value}>
            {/* MineSweeper가 리렌더링 될 때마다 객체가 새로 생김 - Context API를 쓰는 자식들도 리렌더링 */}
            <Form dispatch={dispatch} />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    )
};

export default MineSweeper;