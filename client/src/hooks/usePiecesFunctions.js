const usePiecesFunctions = () => {

    const pawnPathAndThreatenedCells = (x, y, piece, whitePathsObj, blackPathsObj, board, enemyPieces, cellsIThreathens, cellsEnemyThreatens) => {

        let currentPath = []
        let currentThreatnedCells = []

        if(piece === '♟'){
            if(x+1 > 7) return
            
            let firstMove = x === 1 ? true : false

            if(enemyPieces.includes(piece)){
                if(board[x+1][y-1] !== null && y-1 >= 0){
                    currentThreatnedCells.push(`${x+1}${y-1}`)
                }
                if(board[x+1][y+1] !== null && y+1 <= 7){
                    currentThreatnedCells.push(`${x+1}${y+1}`)
                }
            }
            else{
                if(enemyPieces.includes(board[x+1][y-1]) && y-1 >= 0){
                    currentThreatnedCells.push(`${x+1}${y-1}`)
                }
                if(enemyPieces.includes(board[x+1][y+1]) && y+1 <= 8){
                    currentThreatnedCells.push(`${x+1}${y+1}`)
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

            if(enemyPieces.includes(piece)){
                cellsEnemyThreatens[`${x}${y}`] = currentThreatnedCells
            }
            else{
                cellsIThreathens[`${x}${y}`] = currentThreatnedCells
            }

            blackPathsObj[`${x}${y}`] = currentPath

        } 
        if(piece === '♙'){
            
            if(x-1 < 0) return

            let firstMove = x === 6 ? true : false

            if(enemyPieces.includes(piece)){
                if(board[x-1][y-1] !== null && y-1 >= 0){
                    currentThreatnedCells.push(`${x-1}${y-1}`)
                }
                if(board[x-1][y+1] !== null && y+1 <= 7){
                    currentThreatnedCells.push(`${x-1}${y+1}`)
                }
            }
            else{
                if(enemyPieces.includes(board[x-1][y-1]) && y-1 >= 0){
                    currentThreatnedCells.push(`${x-1}${y-1}`)
                }
                if(enemyPieces.includes(board[x-1][y+1]) && y+1 <= 7){
                    currentThreatnedCells.push(`${x-1}${y+1}`)
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

            if(enemyPieces.includes(piece)){
                cellsEnemyThreatens[`${x}${y}`] = currentThreatnedCells
            }
            else{
                cellsIThreathens[`${x}${y}`] = currentThreatnedCells
            }

            whitePathsObj[`${x}${y}`] = currentPath
        } 

    }

    const bishopPathAndThreatenedCells = (x, y, piece, whitePathsObj, blackPathsObj, whiteList ,board, enemyPieces, cellsIThreathens, cellsEnemyThreatens) => {

        let currentPath = []
        let currentThreatnedCells = []

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
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x-i}${y-i}`)
                    }
                    else if(enemyPieces.includes(board[x-i][y-i])){
                        currentThreatnedCells.push(`${x-i}${y-i}`)
                    }
                }
            }
            if(!collidedTopRightDiagonal && x - i >= 0 && y + i <= 7){
                if(board[x-i][y+i] === null){
                    currentPath.push(`${x-i}${y+i}`)
                }
                else{
                    collidedTopRightDiagonal = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x-i}${y+i}`)
                    }
                    else if(enemyPieces.includes(board[x-i][y+i])){
                        currentThreatnedCells.push(`${x-i}${y+i}`)
                    }
                }
            }
            if(!collidedBotRightDiagonal && x + i <= 7 && y - i >= 0){
                if(board[x+i][y-i] === null){
                    currentPath.push(`${x+i}${y-i}`)
                }
                else{
                    collidedBotRightDiagonal = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x+i}${y-i}`)
                    }
                    else if(enemyPieces.includes(board[x+i][y-i])){
                        currentThreatnedCells.push(`${x+i}${y-i}`)
                    }
                }
            }
            if(!collidedBotLeftDiagonal && x + i <= 7 && y + i <= 7){
                if(board[x+i][y+i] === null){
                    currentPath.push(`${x+i}${y+i}`)
                }
                else{
                    collidedBotLeftDiagonal = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x+i}${y+i}`)
                    }
                    else if(enemyPieces.includes(board[x+i][y+i])){
                        currentThreatnedCells.push(`${x+i}${y+i}`)
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
        if(enemyPieces.includes(piece)){
            cellsEnemyThreatens[`${x}${y}`] = currentThreatnedCells
        }
        else{
            cellsIThreathens[`${x}${y}`] = currentThreatnedCells
        }

    }

    const rookPathAndThreatenedCells = (x, y, piece ,whitePathsObj, blackPathsObj ,whiteList ,board, enemyPieces, cellsIThreathens, cellsEnemyThreatens) => {

        let currentPath = []
        let currentThreatnedCells = []

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
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x-i}${y}`)
                    }
                    else if(enemyPieces.includes(board[x-i][y])){
                        currentThreatnedCells.push(`${x-i}${y}`)
                    }
                    
                }
            }
            if(!collidedRightRow && y + i <= 7){
                if(board[x][y+i] === null){
                    currentPath.push(`${x}${y+i}`)
                }
                else{
                    collidedRightRow = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x}${y+i}`)
                    }
                    else if(enemyPieces.includes(board[x][y+i])){
                        currentThreatnedCells.push(`${x}${y+i}`)
                    }

                }
            }
            if(!collidedBotColumn && x + i <= 7){
                if(board[x+i][y] === null){
                    currentPath.push(`${x+i}${y}`)
                }
                else{
                    collidedBotColumn = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x+i}${y}`)
                    }
                    else if(enemyPieces.includes(board[x+i][y])){
                        currentThreatnedCells.push(`${x+i}${y}`)
                    }
             
                }
            }
            if(!collidedLeftRow && y - i >= 0){
                if(board[x][y-i] === null){
                    currentPath.push(`${x}${y-i}`)
                }
                else{
                    collidedLeftRow = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x}${y-i}`)
                    }
                    else if(enemyPieces.includes(board[x][y-i])){
                        currentThreatnedCells.push(`${x}${y-i}`)
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
        if(enemyPieces.includes(piece)){
            cellsEnemyThreatens[`${x}${y}`] = currentThreatnedCells
        }
        else{
            cellsIThreathens[`${x}${y}`] = currentThreatnedCells
        }

    }

    const knightPathAndThreatenedCells = (x, y, piece, whitePathsObj, blackPathsObj, whiteList ,board, enemyPieces, cellsIThreathens, cellsEnemyThreatens) =>{

        let currentPath = []
        let currentThreatnedCells = []

        for (let i = -2; i<3; i++) {

            for(let j = -2 ;j<3; j++){

                if(((i===-1||i===1) && (j===2||j===-2))||((i===-2||i===2) && (j===1||j===-1))){  
                    if(x+i >= 0 && x+i <= 7 && y+j >= 0 && y+j <= 7){
                        if(board[x+i][y+j] === null){
                            currentPath.push(`${x+i}${y+j}`)
                        }
                        else{
                            if(enemyPieces.includes(piece)){
                                currentThreatnedCells.push(`${x+i}${y+j}`)
                            }
                            else if(enemyPieces.includes(board[x+i][y+j])){
                                currentThreatnedCells.push(`${x+i}${y+j}`)
                            }
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
        if(enemyPieces.includes(piece)){
            cellsEnemyThreatens[`${x}${y}`] = currentThreatnedCells
        }
        else{
            cellsIThreathens[`${x}${y}`] = currentThreatnedCells
        }
    }

    const queenPathAndThreatenedCells = (x, y, piece, whitePathsObj, blackPathsObj, whiteList ,board, enemyPieces, cellsIThreathens, cellsEnemyThreatens) =>{

        let currentPath = []
        let currentThreatnedCells = []

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
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x-i}${y-i}`)
                    }
                    else if(enemyPieces.includes(board[x-i][y-i])){
                        currentThreatnedCells.push(`${x-i}${y-i}`)
                    }
                }
            }
            if(!collidedTopRightDiagonal && x - i >= 0 && y + i <= 7){
                if(board[x-i][y+i] === null){
                    currentPath.push(`${x-i}${y+i}`)
                }
                else{
                    collidedTopRightDiagonal = true 
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x-i}${y+i}`)
                    }
                    else if(enemyPieces.includes(board[x-i][y+i])){
                        currentThreatnedCells.push(`${x-i}${y+i}`)
                    }    
                }
            }
            if(!collidedBotRightDiagonal && x + i <= 7 && y - i >= 0){
                if(board[x+i][y-i] === null){
                    currentPath.push(`${x+i}${y-i}`)
                }
                else{
                    collidedBotRightDiagonal = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x+i}${y-i}`)
                    }
                    else if(enemyPieces.includes(board[x+i][y-i])){
                        currentThreatnedCells.push(`${x+i}${y-i}`)
                    }
                }
            }
            if(!collidedBotLeftDiagonal && x + i <= 7 && y + i <= 7){
                if(board[x+i][y+i] === null){
                    currentPath.push(`${x+i}${y+i}`)
                }
                else{
                    collidedBotLeftDiagonal = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x+i}${y+i}`)
                    }
                    else if(enemyPieces.includes(board[x+i][y+i])){
                        currentThreatnedCells.push(`${x+i}${y+i}`)
                    }
                }
            }

            //-----------------ROWS-COLUMNS-----------------------

            if(!collidedTopColumn && x - i >= 0){
                if(board[x-i][y] === null){
                    currentPath.push(`${x-i}${y}`)
                }
                else{
                    collidedTopColumn = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x-i}${y}`)
                    }
                    else if(enemyPieces.includes(board[x-i][y])){
                        currentThreatnedCells.push(`${x-i}${y}`)
                    }
                }
            }
            if(!collidedRightRow && y + i <= 7){
                if(board[x][y+i] === null){
                    currentPath.push(`${x}${y+i}`)
                }
                else{
                    collidedRightRow = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x}${y+i}`)
                    }
                    else if(enemyPieces.includes(board[x][y+i])){
                        currentThreatnedCells.push(`${x}${y+i}`)
                    }
                }
            }
            if(!collidedBotColumn && x + i <= 7){
                if(board[x+i][y] === null){
                    currentPath.push(`${x+i}${y}`)
                }
                else{
                    collidedBotColumn = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x+i}${y}`)
                    }
                    else if(enemyPieces.includes(board[x+i][y])){
                        currentThreatnedCells.push(`${x+i}${y}`)
                    }
                }
            }
            if(!collidedLeftRow && y - i >= 0){
                if(board[x][y-i] === null){
                    currentPath.push(`${x}${y-i}`)
                }
                else{
                    collidedLeftRow = true
                    if(enemyPieces.includes(piece)){
                        currentThreatnedCells.push(`${x}${y-i}`)
                    }
                    else if(enemyPieces.includes(board[x][y-i])){
                        currentThreatnedCells.push(`${x}${y-i}`)
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
        if(enemyPieces.includes(piece)){
            cellsEnemyThreatens[`${x}${y}`] = currentThreatnedCells
        }
        else{
            cellsIThreathens[`${x}${y}`] = currentThreatnedCells
        }

    }

    const kingPathAndThreatenedCells = (x, y, piece, whitePathsObj, blackPathsObj, whiteList ,board, enemyPieces, cellsIThreathens, cellsEnemyThreatens) => {

        let currentPath = []
        let currentThreatnedCells = []
        let enemyPathsObj = whiteList.includes(piece) ? blackPathsObj : whitePathsObj

        let enemyPathsArr = Object.entries(enemyPathsObj).reduce((acc,arr) => {
            if(board[arr[0][0]][arr[0][1]] !== enemyPieces[0]){
                return acc.concat(arr[1])
            }
            return acc
        },[])

        for (let i = -1; i < 2; i++) {
             for (let j = -1;  j < 2; j++) {

                if(x+i < 0 || x+i > 7 || y+j < 0 || y+j > 7) continue

                if(!enemyPathsArr.includes(`${x+i}${y+j}`) && board[x+i][y+j] === null){
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
        if(enemyPieces.includes(piece)){
            cellsEnemyThreatens[`${x}${y}`] = currentThreatnedCells
        }
        else{
            cellsIThreathens[`${x}${y}`] = currentThreatnedCells
        }

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
