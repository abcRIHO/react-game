import React from 'react';
import Tr from './tr';

const Table = ({ onClick, tableData, dispatch }) => {
    // table에서 tr > td 로 dispatch 넘겨주어야 함
    return (
        <table>
            <tbody>
                {Array(tableData.length).fill().map((tr, i) => 
                    (<Tr dispatch={dispatch} rowIndex={i} rowData={tableData[i]}/>))}
            </tbody>
        </table>
    )
};

export default Table;