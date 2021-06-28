import { createContext, useContext, useState } from "react";


const boardContext = createContext()


export const BoardProvider = ({children}) => {

    const [board, setBoard] = useState([
        ["♜","♞","♝","♚","♛","♝","♞","♜"],
        ["♟","♟","♟","♟","♟","♟","♟","♟"],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        ["♙","♙","♙","♙","♙","♙","♙","♙"],
        ["♖","♘","♗","♔","♕","♗","♘","♖"]
    ])

    const [selectedCell, setSelectedCell] = useState(null)

    const isBlack = (x,y) => {
        
        if(x % 2 === 0){

            if(y % 2 === 0){
                return 'white'
            }
            
            else{
                return 'black'
            }

        }
        else{
            if(y % 2 === 1){
                return "white"
            }
            else{
                return 'black'
            }
        }   
    }

    const values = {
        isBlack,
        board,
        setBoard,
        selectedCell,
        setSelectedCell
    }

    return <boardContext.Provider value={values}>{children}</boardContext.Provider>

} 

export const useBoard = () => {

    const context = useContext(boardContext)
    return context

}