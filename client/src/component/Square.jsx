import React from 'react'
import { useBoard } from '../contexts/boardContext'

const Square = ({isBlack, piece, coord}) => {

    const {board, setBoard, selectedCell ,setSelectedCell} = useBoard()

    const handleSelect = (e) => {

        setSelectedCell(coord)

    }

    return (
        <div
         className={`square ${isBlack} ${selectedCell === coord && 'isSelected'}`}
         onClick={handleSelect}>

            {piece}

        </div>
    )
}

export default Square
