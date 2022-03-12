import React, { useContext } from 'react';
import { TableContext } from './minesweeper';
import Td from './td';

const Tr = ({ rowIndex }) => {
    const { tableData } = useContext(TableContext); 
    return (
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((td, i) =>
                <Td rowIndex={rowIndex} cellIndex={i} key={i} /> 
            )}
        </tr>
    )
};

export default Tr;