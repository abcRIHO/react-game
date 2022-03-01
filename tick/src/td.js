import React, { useCallback } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TikTacToe';
// 실제로 user가 선택하는 컴포넌트

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
        dispatch({ type: CHANGE_TURN });
        // 칸을 클릭하면 턴을 넘김
    }, [])

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
    
};

export default Td;