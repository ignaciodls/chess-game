import React from 'react'
import { useBoard } from '../contexts/boardContext'

const Square = ({color, piece, coord}) => {

    const {selectedCell, selectCell, paths, myColorPieces, enemyPieces} = useBoard()
    const inPath = paths[myColorPieces][selectedCell]?.includes(coord)
    const isEnemyPiece = enemyPieces.includes(piece)

    return (
        <div
         className={`square ${color} ${(selectedCell === coord || inPath) && 'isSelected'} ${(inPath && isEnemyPiece) && 'ableToKill'}`}
         onClick={() => selectCell(coord)}>

            {piece}

        </div>
    )
}

export default Square
