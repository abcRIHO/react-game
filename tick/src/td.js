import React, { useCallback, useEffect, useRef } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TikTacToe';
// 실제로 user가 선택하는 컴포넌트

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
    console.log('td rendered');

    const ref = useRef([]);
    useEffect(() => {
        console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
        console.log(cellData, ref.current[3]);
        ref.current = [rowIndex, cellIndex, dispatch, cellData];
    }, [rowIndex, cellIndex, dispatch, cellData]);
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        if(cellData) {
            return; // 한 번 클릭한 cell은 변하지 않음
        }
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
        
        // 칸을 클릭하면 턴을 넘김
        // useReducer는 state가 비동기적으로 변화
    }, [cellData])

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
    
};

export default Td;