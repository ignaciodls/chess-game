import React, { useEffect } from 'react'
import { useBoard } from '../contexts/boardContext'
import '../styles/board.css'
import Square from './Square'

const Board = () => {

    const {board, isBlack, calculatePathsAndThreatenedCells} = useBoard()

    useEffect(()=>{
        calculatePathsAndThreatenedCells()
    },[board])

    return (
        <div className='root'>
            
            <div className='board'>
                {
                    board.map((row,x) => {
                        return <div className='row' key={x}>
                            {
                                row.map((piece,y) => {
                                    return(
                                    <Square
                                     isBlack={isBlack(x,y)}
                                     key={`${x}${y}`}
                                     piece={piece}
                                     coord={`${x}${y}`}
                                     />
                                    )
                                })
                            }
                        </div>
                    })
                }
            </div>

        </div>

    )
}

export default Board
