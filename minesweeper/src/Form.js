import React, { useState, useCallback, useContext } from "react";
import { memo } from "react/cjs/react.production.min";
import { START_GAME, TableContext } from "./minesweeper";

const Form = memo(() => {
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);
    const { dispatch } = useContext(TableContext);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, []);

    const onChangeCell = useCallback((e) => {
        setCell(e.target.value);
    }, []);

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, []);

    const onClickBtn = useCallback(() => {
        // Context API 적용
        dispatch({ type: START_GAME, row, cell, mine }); 
    }, [row, cell, mine]);

    return (
        <div>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
            <input type="number" placeholder="가로" value={row} onChange={onChangeCell} />
            <input type="number" placeholder="지뢰" value={row} onChange={onChangeMine} />
            <button onClick={onClickBtn}>시작</button>
        </div>
    );
});

export default Form;