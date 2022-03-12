import React from 'react';
import { useContext } from 'react';
import { useCallback } from 'react';
import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, 
        QUESTION_CELL, TableContext } from './minesweeper';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            };
        case CODE.OPENED:
            return {
                background: 'white',
            }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow',
            }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'red',
            }
        default:
            return {
                background: 'white',
            }
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';

        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑!';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        
        default:
            return code;
    }
}

const Td = ({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;         
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            default:
                return;
        }
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex});
        // 클릭하면 OPEN_CELL 액션이 디스패치되며 행, 열이 전달되면서 변경

        if (halted) {
            return; // 게임이 멈추면 return
        }
    }, [])

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
              dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
              return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
              dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
              return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
              dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
              return;
            default:
              return;
          }
          if (halted) {
            return; // 게임이 멈추면 return
        }
    }, [tableData[rowIndex][cellIndex]]);
    return (
            <td style={getTdStyle(tableData[rowIndex][cellIndex])}
                onClick={onClickTd}
                onContextMenu={onRightClickTd}>
                {getTdText(tableData[rowIndex][cellIndex])}
            </td>
    );
};

export default Td;