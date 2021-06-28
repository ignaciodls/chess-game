import { createContext, useContext, useState } from "react";


const boardContext = createContext()


export const BoardProvider = ({children}) => {

    const [board, setBoard] = useState([
        ["♜","♞","♝","♚","♛","♝","♞","♜"],
        ["♟","♟","♟","♟","♟","♟","♟","♟"],
        [null,null,null,"♔",null,null,null,null],
        [null,null,null,"♕",null,null,null,"♘"],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        ["♙","♙","♙","♙","♙","♙","♙","♙"],
        ["♖","♘","♗","♔","♕","♗","♘","♖"]
    ])

    const [selectedCell, setSelectedCell] = useState(null)

    const [cellsInPath, setCellsInPath] = useState([])

    const [ableToKill, setAbleToKill] = useState([])

    const blackList=["♜","♞","♝","♚","♛","♟"]
    const whiteList=["♖","♘","♗","♔","♕","♙"]

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

    const selectCell = (coord,piece) => {

        if(board[coord[0]][coord[1]] !== null){
            setSelectedCell(coord)
        }
        else{
            setCellsInPath([])
            setSelectedCell(null)
        }

        calculatePath(piece,coord)

    }

    const calculatePath = (piece,[x,y]) => {

        x = parseInt(x)
        y = parseInt(y)

        if(piece === '♟'){
            let currentPath = []
            
            let limit = x === 1 ? 3 : 2

            for (let i = 1; i < limit; i++) {
                
                currentPath.push(`${x+i}${y}`)
                
            }
            
            setCellsInPath(currentPath)

        } 
        if(piece === '♙'){
            let currentPath = []
            
            let limit = x === 6 ? 3 : 2

            for (let i = 1; i < limit; i++) {
                
                currentPath.push(`${x-i}${y}`)
                
            }
            setCellsInPath(currentPath)            

        } 
        
        if(piece === '♘' || piece === '♞'){
            
            let currentPath = []
            let currentKill = []
            for (let i = -2; i<3; i++) {

                for(let j = -2 ;j<3; j++){

                    if(((i===-1||i===1) && (j===2||j===-2))||((i===-2||i===2) && (j===1||j===-1))){  
                        if(x+i >= 0 && x+i <= 7 && y+j >= 0 && y+j <= 7){
                            if(piece === '♘' && blackList.includes(board[x+i][y+j])){
                                currentKill.push(`${x+i}${y+j}`)
                                continue
                            }

                            currentPath.push(`${x+i}${y+j}`)

                        }
    
                    }
                    
                }  

            }
            setAbleToKill(currentKill)
            setCellsInPath(currentPath) 

        } 


        if(piece === '♗' || piece === '♝'){
            let currentPath = []

            let collidedTopLeftDiagonal = false
            let collidedTopRightDiagonal = false
            let collidedBotRightDiagonal = false
            let collidedBotLeftDiagonal = false

            for (let i = 1; i < 8; i++) {


                if(!collidedTopLeftDiagonal && x - i >= 0 && y - i >= 0){
                    if(board[x-i][y-i] === null){
                        currentPath.push(`${x-i}${y-i}`)
                    }
                    else{
                        collidedTopLeftDiagonal = true
                    }
                }
                if(!collidedTopRightDiagonal && x - i >= 0 && y + i <= 7){
                    if(board[x-i][y+i] === null){
                        currentPath.push(`${x-i}${y+i}`)
                    }
                    else{
                        collidedTopRightDiagonal = true
                    }
                }
                if(!collidedBotRightDiagonal && x + i <= 7 && y - i >= 0){
                    if(board[x+i][y-i] === null){
                        currentPath.push(`${x+i}${y-i}`)
                    }
                    else{
                        collidedBotRightDiagonal = true
                    }
                }
                if(!collidedBotLeftDiagonal && x + i <= 7 && y + i <= 7){
                    if(board[x+i][y+i] === null){
                        currentPath.push(`${x+i}${y+i}`)
                    }
                    else{
                        collidedBotLeftDiagonal = true
                    }
                }
            }

            setCellsInPath(currentPath)
            
        }

        if(piece === '♖' || piece === '♜'){

            let currentPath = []

            let collidedTopColumn = false
            let collidedRightRow = false
            let collidedBotColumn = false
            let collidedLeftRow = false

            for (let i = 1; i < 8; i++) {
                if(!collidedTopColumn && x - i >= 0){
                    if(board[x-i][y] === null){
                        currentPath.push(`${x-i}${y}`)
                    }
                    else{
                        collidedTopColumn = true
                    }
                }
                if(!collidedRightRow && y + i <= 7){
                    if(board[x][y+i] === null){
                        currentPath.push(`${x}${y+i}`)
                    }
                    else{
                        collidedRightRow = true
                    }
                }
                if(!collidedBotColumn && x + i <= 7){
                    if(board[x+i][y] === null){
                        currentPath.push(`${x+i}${y}`)
                    }
                    else{
                        collidedBotColumn = true
                    }
                }
                if(!collidedLeftRow && y - i >= 0){
                    if(board[x][y-i] === null){
                        currentPath.push(`${x}${y-i}`)
                    }
                    else{
                        collidedLeftRow = true
                    }
                }
            }
                
            setCellsInPath(currentPath) 
        }

        if(piece === '♕' || piece === '♛'){
            let currentPath = []

            let collidedTopLeftDiagonal = false
            let collidedTopRightDiagonal = false
            let collidedBotRightDiagonal = false
            let collidedBotLeftDiagonal = false

            let collidedTopColumn = false
            let collidedRightRow = false
            let collidedBotColumn = false
            let collidedLeftRow = false

            for (let i = 1; i < 8; i++) {

                //-----------------DIAGONALS----------------------

                if(!collidedTopLeftDiagonal && x - i >= 0 && y - i >= 0){
                    if(board[x-i][y-i] === null){
                        currentPath.push(`${x-i}${y-i}`)
                    }
                    else{
                        collidedTopLeftDiagonal = true
                    }
                }
                if(!collidedTopRightDiagonal && x - i >= 0 && y + i <= 7){
                    if(board[x-i][y+i] === null){
                        currentPath.push(`${x-i}${y+i}`)
                    }
                    else{
                        collidedTopRightDiagonal = true
                    }
                }
                if(!collidedBotRightDiagonal && x + i <= 7 && y - i >= 0){
                    if(board[x+i][y-i] === null){
                        currentPath.push(`${x+i}${y-i}`)
                    }
                    else{
                        collidedBotRightDiagonal = true
                    }
                }
                if(!collidedBotLeftDiagonal && x + i <= 7 && y + i <= 7){
                    if(board[x+i][y+i] === null){
                        currentPath.push(`${x+i}${y+i}`)
                    }
                    else{
                        collidedBotLeftDiagonal = true
                    }
                }

                //-----------------ROWS-COLUMNS-----------------------

                if(!collidedTopColumn && x - i >= 0){
                    if(board[x-i][y] === null){
                        currentPath.push(`${x-i}${y}`)
                    }
                    else{
                        collidedTopColumn = true
                    }
                }
                if(!collidedRightRow && y + i <= 7){
                    if(board[x][y+i] === null){
                        currentPath.push(`${x}${y+i}`)
                    }
                    else{
                        collidedRightRow = true
                    }
                }
                if(!collidedBotColumn && x + i <= 7){
                    if(board[x+i][y] === null){
                        currentPath.push(`${x+i}${y}`)
                    }
                    else{
                        collidedBotColumn = true
                    }
                }
                if(!collidedLeftRow && y - i >= 0){
                    if(board[x][y-i] === null){
                        currentPath.push(`${x}${y-i}`)
                    }
                    else{
                        collidedLeftRow = true
                    }
                }
            }

            setCellsInPath(currentPath)

        }


        if(piece === '♔' || piece === '♚'){
            let currentPath = []
            
            let collidedTopLeftCell = false
            let collidedTopCell = false
            let collidedTopRightCell = false
            let collidedRightCell = false
            let collidedBotRightCell = false
            let collidedBotCell = false
            let collidedBotLeftCell = false
            let collidedLeftCell = false

            //-----------------ROWS-COLUMNS----------------------

            if(!collidedTopCell && x - 1 >= 0){
                if(board[x-1][y] === null){
                    currentPath.push(`${x-1}${y}`)
                }
                else{
                    collidedTopCell = true
                }
            }
            if(!collidedRightCell && y + 1 <= 7){
                if(board[x][y+1] === null){
                    currentPath.push(`${x}${y+1}`)
                }
                else{
                    collidedRightCell = true
                }
            }
            if(!collidedBotCell && x + 1 <= 7){
                if(board[x+1][y] === null){
                    currentPath.push(`${x+1}${y}`)
                }
                else{
                    collidedBotCell = true
                }
            }
            if(!collidedLeftCell && y - 1 >= 0){
                if(board[x][y-1] === null){
                    currentPath.push(`${x}${y-1}`)
                }
                else{
                    collidedLeftCell = true
                }
            }

            //-----------------DIAGONALS----------------------

            if(!collidedTopLeftCell && x - 1 >= 0 && y - 1 >= 0){
                if(board[x-1][y-1] === null){
                    currentPath.push(`${x-1}${y-1}`)
                }
                else{
                    collidedTopLeftCell = true
                }
            }
            if(!collidedTopRightCell && x - 1 >= 0 && y + 1 <= 7){
                if(board[x-1][y+1] === null){
                    currentPath.push(`${x-1}${y+1}`)
                }
                else{
                    collidedTopRightCell = true
                }
            }
            if(!collidedBotRightCell && x + 1 <= 7 && y - 1 >= 0){
                if(board[x+1][y-1] === null){
                    currentPath.push(`${x+1}${y-1}`)
                }
                else{
                    collidedBotRightCell = true
                }
            }
            if(!collidedBotLeftCell && x + 1 <= 7 && y + 1 <= 7){
                if(board[x+1][y+1] === null){
                    currentPath.push(`${x+1}${y+1}`)
                }
                else{
                    collidedBotLeftCell = true
                }
            }

            setCellsInPath(currentPath)
        }
            
    }





    const values = {
        isBlack,
        board,
        setBoard,
        selectedCell,
        setSelectedCell,
        cellsInPath,
        setCellsInPath,
        calculatePath,
        selectCell,
        ableToKill,
        setAbleToKill
    }

    return <boardContext.Provider value={values}>{children}</boardContext.Provider>

} 

export const useBoard = () => {

    const context = useContext(boardContext)
    return context

}