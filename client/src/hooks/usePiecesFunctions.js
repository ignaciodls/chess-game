import { useSocket } from "../contexts/socketContext"

const usePiecesFunctions = () => {

    const socket = useSocket()

    const pawnPathAndThreatenedCells = (x, y, piece, whitePathsObj, blackPathsObj, board, enemyPieces) => {
        let currentPath = []

        if(piece === '♟'){
            if(x+1 > 7) return
            
            let firstMove = x === 1 ? true : false

            if(enemyPieces.includes(piece)){
                if(y-1 >= 0){
                    currentPath.push(`${x+1}${y-1}`)
                }
                if(y+1 <= 7){
                    currentPath.push(`${x+1}${y+1}`)
                }
            }
            else{
                if(enemyPieces.includes(board[x+1][y-1]) && y-1 >= 0){
                    currentPath.push(`${x+1}${y-1}`)
                }
                if(enemyPieces.includes(board[x+1][y+1]) && y+1 <= 8){
                    currentPath.push(`${x+1}${y+1}`)
                }
            }

            if(firstMove){
                if(board[x+1][y] === null){
                    currentPath.push(`${x+1}${y}`)
                }
                if(board[x+2][y] === null && board[x+1][y] === null){
                    currentPath.push(`${x+2}${y}`)
                }
            }
            else{
                if(board[x+1][y] === null){
                    currentPath.push(`${x+1}${y}`)
                }
            }

            blackPathsObj[`${x}${y}`] = currentPath


        } 
        if(piece === '♙'){
            
            if(x-1 < 0) return

            let firstMove = x === 6 ? true : false

            if(enemyPieces.includes(piece)){
                if(y-1 >= 0){
                    currentPath.push(`${x-1}${y-1}`)
                }
                if(y+1 <= 7){
                    currentPath.push(`${x-1}${y+1}`)
                }
            }
            else{
                if(enemyPieces.includes(board[x-1][y-1]) && y-1 >= 0){
                    currentPath.push(`${x-1}${y-1}`)
                }
                if(enemyPieces.includes(board[x-1][y+1]) && y+1 <= 7){
                    currentPath.push(`${x-1}${y+1}`)
                }
            }

            if(firstMove){
                if(board[x-1][y] === null){
                    currentPath.push(`${x-1}${y}`)
                }
                if(board[x-2][y] === null && board[x-1][y] === null){
                    currentPath.push(`${x-2}${y}`)
                }
            }
            else{
                if(board[x-1][y] === null){
                    currentPath.push(`${x-1}${y}`)
                }
            }

            whitePathsObj[`${x}${y}`] = currentPath
        } 

    }

    const bishopPathAndThreatenedCells = (x, y, piece, whitePathsObj, blackPathsObj, whiteList ,board, enemyPieces, kings, myColorPieces) => {

        let currentPath = []

        let collidedTopLeftDiagonal = false
        let collidedTopRightDiagonal = false
        let collidedBotRightDiagonal = false
        let collidedBotLeftDiagonal = false

        for (let i = 1; i < 8; i++) {

            if(!collidedTopLeftDiagonal && x - i >= 0 && y - i >= 0){
                if(board[x-i][y-i] === null  || (board[x-i][y-i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x-i}${y-i}`)
                }
                else{
                    collidedTopLeftDiagonal = true
                    if(enemyPieces.includes(board[x-i][y-i])){
                        currentPath.push(`${x-i}${y-i}`)
                    }
                }
            }
            if(!collidedTopRightDiagonal && x - i >= 0 && y + i <= 7){
                if(board[x-i][y+i] === null || (board[x-i][y+i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x-i}${y+i}`)
                }
                else{
                    collidedTopRightDiagonal = true
                    if(enemyPieces.includes(board[x-i][y+i])){
                        currentPath.push(`${x-i}${y+i}`)
                    }
                }
            }
            if(!collidedBotRightDiagonal && x + i <= 7 && y - i >= 0){
                if(board[x+i][y-i] === null || (board[x+i][y-i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x+i}${y-i}`)
                }
                else{
                    collidedBotRightDiagonal = true
                    if(enemyPieces.includes(board[x+i][y-i])){
                        currentPath.push(`${x+i}${y-i}`)
                    }
                }
            }
            if(!collidedBotLeftDiagonal && x + i <= 7 && y + i <= 7){
                if(board[x+i][y+i] === null || (board[x+i][y+i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x+i}${y+i}`)
                }
                else{
                    collidedBotLeftDiagonal = true
                    if(enemyPieces.includes(board[x+i][y+i])){
                        currentPath.push(`${x+i}${y+i}`)
                    }
                }
            }
        }

        if(whiteList.includes(piece)){
            whitePathsObj[`${x}${y}`] = currentPath
        }
        else{
            blackPathsObj[`${x}${y}`] = currentPath
        }
    }

    const rookPathAndThreatenedCells = (x, y, piece ,whitePathsObj, blackPathsObj ,whiteList ,board, enemyPieces, kings, myColorPieces) => {

        let currentPath = []

        let collidedTopColumn = false
        let collidedRightRow = false
        let collidedBotColumn = false
        let collidedLeftRow = false

        for (let i = 1; i < 8; i++) {
            if(!collidedTopColumn && x - i >= 0){
                if(board[x-i][y] === null || (board[x-i][y] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x-i}${y}`)
                }
                else{
                    collidedTopColumn = true
                    if(enemyPieces.includes(board[x-i][y])){
                        currentPath.push(`${x-i}${y}`)
                    }
                }
            }
            if(!collidedRightRow && y + i <= 7){
                if(board[x][y+i] === null || (board[x][y+i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x}${y+i}`)
                }
                else{
                    collidedRightRow = true
                    if(enemyPieces.includes(board[x][y+i])){
                        currentPath.push(`${x}${y+i}`)
                    }

                }
            }
            if(!collidedBotColumn && x + i <= 7){
                if(board[x+i][y] === null || (board[x+i][y] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x+i}${y}`)
                }
                else{
                    collidedBotColumn = true
                    if(enemyPieces.includes(board[x+i][y])){
                        currentPath.push(`${x+i}${y}`)
                    }
             
                }
            }
            if(!collidedLeftRow && y - i >= 0){
                if(board[x][y-i] === null || (board[x][y-i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x}${y-i}`)
                }
                else{
                    collidedLeftRow = true
                    if(enemyPieces.includes(board[x][y-i])){
                        currentPath.push(`${x}${y-i}`)
                    }
                }
            }
        }

        if(whiteList.includes(piece)){
            whitePathsObj[[`${x}${y}`]] = currentPath
        }    
        else{
            blackPathsObj[`${x}${y}`] = currentPath
        }
    }

    const knightPathAndThreatenedCells = (x, y, piece, whitePathsObj, blackPathsObj, whiteList ,board, enemyPieces) =>{

        let currentPath = []

        for (let i = -2; i<3; i++) {

            for(let j = -2 ;j<3; j++){

                if(((i===-1||i===1) && (j===2||j===-2))||((i===-2||i===2) && (j===1||j===-1))){  
                    if(x+i >= 0 && x+i <= 7 && y+j >= 0 && y+j <= 7){
                        if(board[x+i][y+j] === null){
                            currentPath.push(`${x+i}${y+j}`)
                        }
                        else if(enemyPieces.includes(board[x+i][y+j])){
                            currentPath.push(`${x+i}${y+j}`)
                        }
                    }
                }
            }  
        }

        if(whiteList.includes(piece)){
            whitePathsObj[`${x}${y}`] = currentPath
        }
        else{
            blackPathsObj[`${x}${y}`] = currentPath
        }
    }

    const queenPathAndThreatenedCells = (x, y, piece, whitePathsObj, blackPathsObj, whiteList ,board, enemyPieces, kings, myColorPieces) =>{

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
                if(board[x-i][y-i] === null || (board[x-i][y-i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x-i}${y-i}`)
                }
                else{
                    collidedTopLeftDiagonal = true
                    if(enemyPieces.includes(board[x-i][y-i])){
                        currentPath.push(`${x-i}${y-i}`)
                    }
                }
            }
            if(!collidedTopRightDiagonal && x - i >= 0 && y + i <= 7){
                if(board[x-i][y+i] === null || (board[x-i][y+i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x-i}${y+i}`)
                }
                else{
                    collidedTopRightDiagonal = true 
                    if(enemyPieces.includes(board[x-i][y+i])){
                        currentPath.push(`${x-i}${y+i}`)
                    }    
                }
            }
            if(!collidedBotRightDiagonal && x + i <= 7 && y + i <= 7){
                if(board[x+i][y+i] === null || (board[x+i][y+i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x+i}${y+i}`)
                }
                else{
                    collidedBotRightDiagonal = true
                    if(enemyPieces.includes(board[x+i][y+i])){
                        currentPath.push(`${x+i}${y+i}`)
                    }
                }
            }
            if(!collidedBotLeftDiagonal && x + i <= 7 && y - i >= 0){
                if(board[x+i][y-i] === null || (board[x+i][y-i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x+i}${y-i}`)
                }
                else{
                    collidedBotLeftDiagonal = true
                    if(enemyPieces.includes(board[x+i][y-i])){
                        currentPath.push(`${x+i}${y-i}`)
                    }
                }
            }

            //-----------------ROWS-COLUMNS-----------------------

            if(!collidedTopColumn && x - i >= 0){
                if(board[x-i][y] === null || (board[x-i][y] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x-i}${y}`)
                }
                else{
                    collidedTopColumn = true
                    if(enemyPieces.includes(board[x-i][y])){
                        currentPath.push(`${x-i}${y}`)
                    }
                }
            }
            if(!collidedRightRow && y + i <= 7){
                if(board[x][y+i] === null || (board[x][y+i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x}${y+i}`)
                }
                else{
                    collidedRightRow = true
                    if(enemyPieces.includes(board[x][y+i])){
                        currentPath.push(`${x}${y+i}`)
                    }
                }
            }
            if(!collidedBotColumn && x + i <= 7){
                if(board[x+i][y] === null || (board[x+i][y] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x+i}${y}`)
                }
                else{
                    collidedBotColumn = true
                    if(enemyPieces.includes(board[x+i][y])){
                        currentPath.push(`${x+i}${y}`)
                    }
                }
            }
            if(!collidedLeftRow && y - i >= 0){
                if(board[x][y-i] === null || (board[x][y-i] === kings[myColorPieces] && enemyPieces.includes(piece))){
                    currentPath.push(`${x}${y-i}`)
                }
                else{
                    collidedLeftRow = true
                    if(enemyPieces.includes(board[x][y-i])){
                        currentPath.push(`${x}${y-i}`)
                    }
                }
            }
        }

        if(whiteList.includes(piece)){
            whitePathsObj[`${x}${y}`] = currentPath
        }
        else{
            blackPathsObj[`${x}${y}`] = currentPath
        }
    }

    const kingPathAndThreatenedCells = (x, y, piece, whitePathsObj, blackPathsObj, whiteList ,board, enemyPieces, setImInCheck, roomId, myColorPieces) => {

        let currentPath = []
        let enemyPathsObj = whiteList.includes(piece) ? blackPathsObj : whitePathsObj
        
        let enemyPathsArr = Object.entries(enemyPathsObj).reduce((acc,arr) => {
            if(board[arr[0][0]][arr[0][1]] !== enemyPieces[0]){
                return acc.concat(arr[1])
            }
            else{
                return acc.concat(arr[1].slice(0,2))
            }
        },[])

        for (let i = -1; i < 2; i++) {
             for (let j = -1;  j < 2; j++) {

                if(x+i < 0 || x+i > 7 || y+j < 0 || y+j > 7 || (i === 0 && j === 0)) continue

                if(!enemyPathsArr.includes(`${x+i}${y+j}`) && (enemyPieces.includes(board[x+i][y+j]) || board[x+i][y+j] === null)){
                    currentPath.push(`${x+i}${y+j}`)
                }               
            }     
        }
        
        if(whiteList.includes(piece)){
            whitePathsObj[`${x}${y}`] = currentPath
        }
        else{
            blackPathsObj[`${x}${y}`] = currentPath
        }
        
        if(!enemyPieces.includes(piece)){
            validateCheck(x, y, board, enemyPieces, piece, whiteList, currentPath, whitePathsObj, blackPathsObj, setImInCheck, roomId, myColorPieces)
        }
    }

    const validateCheck = (x, y, board, enemyPieces, piece, whiteList, myKingPath, whitePathsObj, blackPathsObj, setImInCheck, roomId, myColorPieces) => {
        
        let myPathsObj = whiteList.includes(piece) ? whitePathsObj : blackPathsObj

        let possibleDefenses = []
        let piecesThreateningMyKing = 0

        let topLeftDiagonal = []
        let topRightDiagonal = []
        let botRightDiagonal = []
        let botLeftDiagonal = []

        let topColumn = []
        let rightRow = []
        let botColumn = []
        let leftRow = []

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
                    topLeftDiagonal.push(`${x-i}${y-i}`)
                }
                else{
                    collidedTopLeftDiagonal = true
                    if(enemyPieces.slice(-3,-1).includes(board[x-i][y-i])){
                        topLeftDiagonal.push(`${x-i}${y-i}`)
                        piecesThreateningMyKing++
                    }
                    else if(whiteList.includes(piece) && board[x-i][y-i] === enemyPieces[0] && i === 1){
                        topLeftDiagonal.push(`${x-i}${y-i}`)
                        piecesThreateningMyKing++
                    }
                    else{
                        topLeftDiagonal = []
                    }
                }
                if((x-i === 0 || y-i === 0) && board[x-i][y-i] === null){
                    topLeftDiagonal = []
                }
            }
            if(!collidedTopRightDiagonal && x - i >= 0 && y + i <= 7){
                if(board[x-i][y+i] === null){
                    topRightDiagonal.push(`${x-i}${y+i}`)
                }
                else{
                    collidedTopRightDiagonal = true 
                    if(enemyPieces.slice(-3,-1).includes(board[x-i][y+i])){
                        topRightDiagonal.push(`${x-i}${y+i}`)
                        piecesThreateningMyKing++
                    }
                    else if(whiteList.includes(piece) && board[x-i][y+i] === enemyPieces[0] && i === 1){
                        topRightDiagonal.push(`${x-i}${y+i}`)
                        piecesThreateningMyKing++
                    }   
                    else{
                        topRightDiagonal = []
                    } 
                }
                if((x-i === 0 || y+i === 7) && board[x-i][y+i] === null){
                    topRightDiagonal = []
                }
            }
            if(!collidedBotLeftDiagonal && x + i <= 7 && y - i >= 0){
                if(board[x+i][y-i] === null){
                    botLeftDiagonal.push(`${x+i}${y-i}`)
                }
                else{
                    collidedBotLeftDiagonal = true
                    if(enemyPieces.slice(-3,-1).includes(board[x+i][y-i])){
                        botLeftDiagonal.push(`${x+i}${y-i}`)
                        piecesThreateningMyKing++
                    }
                    else if(!whiteList.includes(piece) && board[x+i][y-i] === enemyPieces[0] && i === 1){
                        botLeftDiagonal.push(`${x+i}${y-i}`)
                        piecesThreateningMyKing++
                    }
                    else{
                        botLeftDiagonal = []
                    }
                }
                if((x+i === 7 || y-i === 0) && board[x+i][y-i] === null){
                    botLeftDiagonal = []
                }
            }
            if(!collidedBotRightDiagonal && x + i <= 7 && y + i <= 7){
                if(board[x+i][y+i] === null){
                    botRightDiagonal.push(`${x+i}${y+i}`)
                }
                else{
                    collidedBotRightDiagonal = true
                    if(enemyPieces.slice(-3,-1).includes(board[x+i][y+i])){
                        botRightDiagonal.push(`${x+i}${y+i}`)
                        piecesThreateningMyKing++
                    }
                    else if(!whiteList.includes(piece) && board[x+i][y+i] === enemyPieces[0] && i === 1){
                        botRightDiagonal.push(`${x+i}${y+i}`)
                        piecesThreateningMyKing++
                    }
                    else{
                        botRightDiagonal = []
                    }
                }
                if((x+i === 7 || y+i === 7) && board[x+i][y+i] === null){
                    botRightDiagonal = []
                }
            }

            //-----------------ROWS-COLUMNS-----------------------
            if(!collidedTopColumn && x - i >= 0){
                if(board[x-i][y] === null){
                    topColumn.push(`${x-i}${y}`)
                }
                else{
                    collidedTopColumn = true
                    if(enemyPieces.slice(-2).includes(board[x-i][y])){
                        topColumn.push(`${x-i}${y}`)
                        piecesThreateningMyKing++
                    }
                    else{
                        topColumn = []
                    }
                }
                if(x-i === 0 && board[x-i][y] === null){
                    topColumn = []
                }
            }
            if(!collidedRightRow && y + i <= 7){
                if(board[x][y+i] === null){
                    rightRow.push(`${x}${y+i}`)
                }
                else{
                    collidedRightRow = true
                    if(enemyPieces.slice(-2).includes(board[x][y+i])){
                        rightRow.push(`${x}${y+i}`)
                        piecesThreateningMyKing++
                    }
                    else{
                        rightRow = []
                    }
                }
                if(y+i === 7 && board[x][y+i] === null){
                    rightRow = []
                }
            }
            if(!collidedBotColumn && x + i <= 7){
                if(board[x+i][y] === null){
                    botColumn.push(`${x+i}${y}`)
                }
                else{
                    collidedBotColumn = true
                    if(enemyPieces.slice(-2).includes(board[x+i][y])){
                        botColumn.push(`${x+i}${y}`)
                        piecesThreateningMyKing++
                    }
                    else{
                        botColumn = []
                    }
                }
                if(x+i === 7 && board[x+i][y] === null){
                    botColumn = []
                }
            }
            if(!collidedLeftRow && y - i >= 0){
                if(board[x][y-i] === null){
                    leftRow.push(`${x}${y-i}`)
                }
                else{
                    collidedLeftRow = true
                    if(enemyPieces.slice(-2).includes(board[x][y-i])){
                        leftRow.push(`${x}${y-i}`)
                        piecesThreateningMyKing++
                    }
                    else{
                        leftRow = []
                    }
                }
                if(y-i === 0 && board[x][y-i] === null){
                    leftRow = []
                }
            }
        }

        //Knigths
        for (let i = -2; i<3; i++) {

            for(let j = -2 ;j<3; j++){

                if(((i===-1||i===1) && (j===2||j===-2))||((i===-2||i===2) && (j===1||j===-1))){  
                    if(x+i >= 0 && x+i <= 7 && y+j >= 0 && y+j <= 7){ 
                        if(board[x+i][y+j] === enemyPieces[2]){
                            possibleDefenses.push(`${x+i}${y+j}`)
                            piecesThreateningMyKing++
                        }
                    }
                }
            }  
        }
        
        possibleDefenses = possibleDefenses.concat(topLeftDiagonal).concat(topRightDiagonal).concat(botRightDiagonal).concat(botLeftDiagonal).concat(topColumn).concat(rightRow).concat(botColumn).concat(leftRow)
        let myPossiblePathsObj = Object.entries(myPathsObj).reduce((acc,arr) => {
            acc[arr[0]] = arr[1].filter(value => possibleDefenses.includes(value))
            return acc
        },{})        
        
        myPossiblePathsObj[`${x}${y}`] = myKingPath

        //-----------CHECKS-----------------------
        
        if((piecesThreateningMyKing > 1 && myKingPath.length === 0) || (myKingPath.length === 0 && piecesThreateningMyKing === 1 && Object.values(myPossiblePathsObj).flat().length === 0)){
            socket.emit('mate', myColorPieces, roomId)
        }
        else if(piecesThreateningMyKing === 1){
            if(whiteList.includes(piece)){
                Object.assign(whitePathsObj, myPossiblePathsObj)
            }
            else{
                Object.assign(blackPathsObj, myPossiblePathsObj)
            }
            setImInCheck(true)
        }
        else if(piecesThreateningMyKing === 0 && Object.values(myPathsObj).flat().length === 0){
            socket.emit('mate', myColorPieces, roomId)
        }
        else{
            setImInCheck(false)
        }


        //-----------CHECKS-----------------------

    }

    return{
        pawnPathAndThreatenedCells,
        knightPathAndThreatenedCells,
        bishopPathAndThreatenedCells,
        rookPathAndThreatenedCells,
        queenPathAndThreatenedCells,
        kingPathAndThreatenedCells
    }
}

export default usePiecesFunctions
