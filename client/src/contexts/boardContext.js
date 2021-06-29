import { createContext, useContext, useState } from "react";
import usePiecesFunctions from "../hooks/usePiecesFunctions";


const boardContext = createContext()


export const BoardProvider = ({children}) => {

    const [board, setBoard] = useState([
        ["♜","♗","♞","♚","♛","♝","♞","♜"],
        ["♟","♟","♟","♟","♟","♟","♟","♟"],
        [null,null,null,"♔",null,null,null,null],
        [null,"♗",null,"♗",null,null,null,"♘"],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        ["♙","♙","♙","♙","♙","♙","♙","♙"],
        ["♖","♘","♗","♔","♕","♗","♘","♖"]
    ])

    const [selectedCell, setSelectedCell] = useState(null)

    const [enemyPieces, setEnemyPieces] = useState(["♜","♞","♝","♚","♛","♟"])

    const [myColorPieces, setMyColorPieces] = useState('white')

    const [paths, setPaths] = useState({
        'white':[],
        'black':[]
    })

    const [cellsBeingThreatnedBy, setCellsBeingThreatnedBy] = useState({
        'enemy':[],
        'ally':[]
    })

    //const blackList=["♜","♞","♝","♚","♛","♟"]
    const whiteList=["♖","♘","♗","♔","♕","♙"]

    const { pawnPathAndThreatenedCells,
            knightPathAndThreatenedCells,
            bishopPathAndThreatenedCells,
            rookPathAndThreatenedCells,
            queenPathAndThreatenedCells,
            kingPathAndThreatenedCells  } = usePiecesFunctions()

    const calculatePathsAndThreatenedCells = () =>{

        let whitePathsObj = {}
        let blackPathsObj = {}
        let cellsIThreathens = {}
        let cellsEnemyThreatens = {}
        

        board.forEach((row,x) => {
            row.forEach((piece,y) => {

                if(piece !== null){
                    calculatePathAndThreatenedCells(piece, x, y, whitePathsObj, blackPathsObj, cellsIThreathens, cellsEnemyThreatens)

                }
            })
        });
        setPaths({
            'white':whitePathsObj,
            'black':blackPathsObj
        })
        setCellsBeingThreatnedBy({
            'enemy':cellsEnemyThreatens,
            'ally':cellsIThreathens
        })
    }

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

    const selectCell = (coord) => {
        
        if(selectedCell){
            if(paths[myColorPieces][selectedCell]?.includes(coord)){
                setBoard(
                    board.map((row,x) =>{
                        return row.map((currPiece,y) => {
                            if(x === parseInt(coord[0]) && y === parseInt(coord[1])){
                                return board[selectedCell[0]][selectedCell[1]]
                            }
                            else if(x === parseInt(selectedCell[0]) && y === parseInt(selectedCell[1])){
                                return null
                            }
                            else{
                                return currPiece
                            }
                        })
                    })
                )
            }
        }

        if(board[coord[0]][coord[1]] !== null){
            setSelectedCell(coord)
        }
        if(board[coord[0]][coord[1]] == null){
            setSelectedCell(null)
        }

    }

    const calculatePathAndThreatenedCells = (piece, x, y, whitePathsObj, blackPathsObj, cellsIThreathens, cellsEnemyThreatens) => {

        if(piece === '♙' || piece === '♟'){
            pawnPathAndThreatenedCells(x, y, piece, whitePathsObj, blackPathsObj, board, enemyPieces, cellsIThreathens, cellsEnemyThreatens)
        }

        if(piece === '♘' || piece === '♞'){
            knightPathAndThreatenedCells(x, y, piece, whitePathsObj, blackPathsObj, whiteList, board, enemyPieces, cellsIThreathens, cellsEnemyThreatens)
        } 

        if(piece === '♗' || piece === '♝'){
            bishopPathAndThreatenedCells(x, y, piece, whitePathsObj, blackPathsObj, whiteList, board, enemyPieces, cellsIThreathens, cellsEnemyThreatens)            
        }

        if(piece === '♖' || piece === '♜'){
            rookPathAndThreatenedCells(x, y, piece ,whitePathsObj, blackPathsObj ,whiteList, board, enemyPieces, cellsIThreathens, cellsEnemyThreatens)
        }

        if(piece === '♕' || piece === '♛'){
            queenPathAndThreatenedCells(x, y, piece, whitePathsObj, blackPathsObj, whiteList, board, enemyPieces, cellsIThreathens, cellsEnemyThreatens)
        }

        if(piece === '♔' || piece === '♚'){
            kingPathAndThreatenedCells(x, y, piece, whitePathsObj, blackPathsObj, whiteList, board, enemyPieces, cellsIThreathens, cellsEnemyThreatens)
        }
    }



    const values = {
        isBlack,
        board,
        setBoard,
        selectedCell,
        setSelectedCell,
        calculatePathAndThreatenedCells,
        selectCell,
        setEnemyPieces,
        paths,
        cellsBeingThreatnedBy,
        calculatePathsAndThreatenedCells,
        myColorPieces
    }

    return <boardContext.Provider value={values}>{children}</boardContext.Provider>

} 

export const useBoard = () => {

    const context = useContext(boardContext)
    return context

}