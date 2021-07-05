import { createContext, useContext, useState } from "react";
import usePiecesFunctions from "../hooks/usePiecesFunctions";
import { useSocket } from "./socketContext";

const boardContext = createContext()

export const BoardProvider = ({children}) => {

    const socket = useSocket()

    const initialBoard = [
        ["♜","♞","♝","♛",'♚',"♝","♞","♜"],
        ["♟","♟","♟","♟","♟","♟","♟","♟"],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        ["♙","♙","♙","♙","♙","♙","♙","♙"],
        ["♖","♘","♗","♕",'♔',"♗","♘","♖"]
    ]

    const [board, setBoard] = useState(initialBoard)

    const [selectedCell, setSelectedCell] = useState(null)

    const [myColorPieces, setMyColorPieces] = useState(null)
    
    const enemyPieces = myColorPieces === 'white' ? ["♟","♚","♞","♝","♛","♜"] : ["♙","♔","♘","♗","♕","♖"]
    const myPieces =  myColorPieces === 'white' ? ["♙","♔","♘","♗","♕","♖",] : ["♟","♚","♞","♝","♛","♜"]

    const whiteList=["♖","♘","♗","♔","♕","♙"]

    const [myTurn, setMyTurn] = useState(false)

    const [imGameRequester, setImGameRequester] = useState(false)

    const [paths, setPaths] = useState({
        'white':[],
        'black':[]
    })

    const kings = {
        'white':'♔',
        'black':'♚'
    }

    const [imInCheck, setImInCheck] = useState(false)

    const { pawnPathAndThreatenedCells,
            knightPathAndThreatenedCells,
            bishopPathAndThreatenedCells,
            rookPathAndThreatenedCells,
            queenPathAndThreatenedCells,
            kingPathAndThreatenedCells  } = usePiecesFunctions()

    const calculatePathsAndThreatenedCells = (roomId) =>{

        let whitePathsObj = {}
        let blackPathsObj = {}
        let myKingCoords = []

        board.forEach((row,x) => {
            row.forEach((piece,y) => {

                if(piece !== null){
                    if(piece === kings[myColorPieces]){
                        myKingCoords[0] = x
                        myKingCoords[1] = y
                    }
                    else{
                        calculatePathAndThreatenedCells(piece, x, y, whitePathsObj, blackPathsObj)
                    }
                }

            })
        });

        calculatePathAndThreatenedCells(kings[myColorPieces], myKingCoords[0], myKingCoords[1], whitePathsObj, blackPathsObj, roomId)

        setPaths({
            'white':whitePathsObj,
            'black':blackPathsObj
        })
    }

    const color = (x,y) => {
        
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

    const moveOrTakePiece = (coord, roomId) => {

        let newBoard = board.map((row,x) =>{
            return row.map((currPiece,y) => {

                if(x === parseInt(coord[0]) && y === parseInt(coord[1])){
                    if(board[selectedCell[0]][selectedCell[1]] === "♟" && x === 7){
                        return myPieces[4]
                    }
                    else if(board[selectedCell[0]][selectedCell[1]] === "♙" && x === 0){
                        return myPieces[4]
                    }
                    else{
                        return board[selectedCell[0]][selectedCell[1]]
                    }
                }
                else if(x === parseInt(selectedCell[0]) && y === parseInt(selectedCell[1])){
                    return null
                }
                else{
                    return currPiece
                }
            })
        })

        socket.emit('board', newBoard, roomId)

        setSelectedCell(null)

    }

    const selectCell = (coord, roomId) => {

        if(myTurn){
            if(selectedCell){
                if(paths[myColorPieces][selectedCell]?.includes(coord)){
                    moveOrTakePiece(coord, roomId)
                }
            }
    
            if(enemyPieces.includes(board[coord[0]][coord[1]])) return
    
            if(board[coord[0]][coord[1]] !== null){
                setSelectedCell(coord)
            }
            if(board[coord[0]][coord[1]] == null){
                setSelectedCell(null)
            }
        }
    }

    const calculatePathAndThreatenedCells = (piece, x, y, whitePathsObj, blackPathsObj, roomId) => {

        if(piece === '♙' || piece === '♟'){
            pawnPathAndThreatenedCells(x, y, piece, whitePathsObj, blackPathsObj, board, enemyPieces)
        }

        if(piece === '♘' || piece === '♞'){
            knightPathAndThreatenedCells(x, y, piece, whitePathsObj, blackPathsObj, whiteList, board, enemyPieces)
        } 

        if(piece === '♗' || piece === '♝'){
            bishopPathAndThreatenedCells(x, y, piece, whitePathsObj, blackPathsObj, whiteList, board, enemyPieces, kings, myColorPieces)            
        }

        if(piece === '♖' || piece === '♜'){
            rookPathAndThreatenedCells(x, y, piece ,whitePathsObj, blackPathsObj ,whiteList, board, enemyPieces, kings, myColorPieces)
        }

        if(piece === '♕' || piece === '♛'){
            queenPathAndThreatenedCells(x, y, piece, whitePathsObj, blackPathsObj, whiteList, board, enemyPieces, kings, myColorPieces)
        }

        if(piece === '♔' || piece === '♚'){
            kingPathAndThreatenedCells(x, y, piece, whitePathsObj, blackPathsObj, whiteList, board, enemyPieces, setImInCheck, roomId, myColorPieces)
        }
    }



    const values = {
        color,
        board,
        setBoard,
        selectedCell,
        setSelectedCell,
        calculatePathAndThreatenedCells,
        selectCell,
        paths,
        calculatePathsAndThreatenedCells,
        myColorPieces,
        setMyColorPieces,
        enemyPieces,
        imInCheck,
        myPieces,
        myTurn,
        setMyTurn,
        setImInCheck,
        imGameRequester,
        setImGameRequester,
        initialBoard
        
    }

    return <boardContext.Provider value={values}>{children}</boardContext.Provider>

} 

export const useBoard = () => {

    const context = useContext(boardContext)
    return context

}