import React from 'react'
import { useBoard } from '../contexts/boardContext'

const Square = ({isBlack, piece, coord}) => {

    const {selectedCell ,setSelectedCell, cellsInPath, calculatePath, selectCell, ableToKill} = useBoard()

    return (
        <div
         className={`square ${isBlack} ${(selectedCell === coord || cellsInPath.includes(coord)) && 'isSelected'} ${ableToKill.includes(coord) && 'ableToKill'}`}
         onClick={() => selectCell(coord,piece)}>

            {piece}

        </div>
    )
}

export default Square
