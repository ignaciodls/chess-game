import React from 'react'
import { useBoard } from '../contexts/boardContext'

const Square = ({color, piece, coord, roomId}) => {

    const {selectedCell, selectCell, paths, myColorPieces, enemyPieces, imInCheck, myPieces} = useBoard()

    const inPath = paths[myColorPieces][selectedCell]?.includes(coord)
    const isEnemyPiece = enemyPieces.includes(piece)

    return (
        <div
         className={`square ${color} ${(selectedCell === coord || inPath) && 'isSelected'} ${(inPath && isEnemyPiece) && 'ableToKill'} ${(imInCheck && piece === myPieces[1]) && 'ableToKill'}`}
         onClick={() => selectCell(coord, roomId)}>

            {piece}

        </div>
    )
}

export default Square
