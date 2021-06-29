import React from 'react'
import { useBoard } from '../contexts/boardContext'

const Square = ({isBlack, piece, coord}) => {

    const {selectedCell, selectCell, paths, cellsBeingThreatnedBy, myColorPieces} = useBoard()

    return (
        <div
         className={`square ${isBlack} ${(selectedCell === coord || paths[myColorPieces][selectedCell]?.includes(coord)) && 'isSelected'} ${cellsBeingThreatnedBy['ally'][selectedCell]?.includes(coord) && 'ableToKill'}`}
         onClick={() => selectCell(coord)}>

            {piece}

        </div>
    )
}

export default Square
