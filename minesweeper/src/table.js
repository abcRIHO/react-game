import React, { useContext } from 'react';
import { TableContext } from './minesweeper';
import Tr from './tr';

const Table = () => {
    const { tableData }= useContext(TableContext);
    return (
            <table>
                <tbody>
                    {Array(tableData.length).fill().map((tr, i) => 
                        <Tr rowIndex={i} key={i} />)}
                    {/* 행 수, 열 수로 반복문을 돌려 tr 및 td 만들기 */}
                </tbody>
            </table>
    )
};

export default Table;