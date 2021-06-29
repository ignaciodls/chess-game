const usePiecesFunctions = () => {

    const pawnPathAndThreatenedCells = (x, y, piece, whitePathsObj, blackPathsObj, board, enemyPieces, cellsIThreathens, cellsEnemyThreatens) => {

        if(piece === '♟'){
            let currentPath = []
            
            let firstMove = x === 1 ? true : false

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
            let currentPath = []
            
            let firstMove = x === 6 ? true : false

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
            blackPathsObj=[`${x}${y}`]
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
                if(enemyPieces.includes(piece)){
                    currentThreatnedCells.push(`${x-1}${y}`)
                }
                else if(enemyPieces.includes(board[x-1][y])){
                    currentThreatnedCells.push(`${x-1}${y}`)
                }
            }
        }
        if(!collidedRightCell && y + 1 <= 7){
            if(board[x][y+1] === null){
                currentPath.push(`${x}${y+1}`)
            }
            else{
                collidedRightCell = true
                if(enemyPieces.includes(piece)){
                    currentThreatnedCells.push(`${x}${y+1}`)
                }
                else if(enemyPieces.includes(board[x][y+1])){
                    currentThreatnedCells.push(`${x}${y+1}`)
                }
            }
        }
        if(!collidedBotCell && x + 1 <= 7){
            if(board[x+1][y] === null){
                currentPath.push(`${x+1}${y}`)
            }
            else{
                collidedBotCell = true
                if(enemyPieces.includes(piece)){
                    currentThreatnedCells.push(`${x+1}${y}`)
                }
                else if(enemyPieces.includes(board[x+1][y])){
                    currentThreatnedCells.push(`${x+1}${y}`)
                }
            }
        }
        if(!collidedLeftCell && y - 1 >= 0){
            if(board[x][y-1] === null){
                currentPath.push(`${x}${y-1}`)
            }
            else{
                collidedLeftCell = true
                if(enemyPieces.includes(piece)){
                    currentThreatnedCells.push(`${x}${y-1}`)
                }
                else if(enemyPieces.includes(board[x][y-1])){
                    currentThreatnedCells.push(`${x}${y-1}`)
                }
            }
        }

        //-----------------DIAGONALS----------------------

        if(!collidedTopLeftCell && x - 1 >= 0 && y - 1 >= 0){
            if(board[x-1][y-1] === null){
                currentPath.push(`${x-1}${y-1}`)
            }
            else{
                collidedTopLeftCell = true
                if(enemyPieces.includes(piece)){
                    currentThreatnedCells.push(`${x-1}${y-1}`)
                }
                else if(enemyPieces.includes(board[x-1][y-1])){
                    currentThreatnedCells.push(`${x-1}${y-1}`)
                }
            }
        }
        if(!collidedTopRightCell && x - 1 >= 0 && y + 1 <= 7){
            if(board[x-1][y+1] === null){
                currentPath.push(`${x-1}${y+1}`)
            }
            else{
                collidedTopRightCell = true
                if(enemyPieces.includes(piece)){
                    currentThreatnedCells.push(`${x-1}${y+1}`)
                }
                else if(enemyPieces.includes(board[x-1][y+1])){
                    currentThreatnedCells.push(`${x-1}${y+1}`)
                }
            }
        }
        if(!collidedBotRightCell && x + 1 <= 7 && y - 1 >= 0){
            if(board[x+1][y-1] === null){
                currentPath.push(`${x+1}${y-1}`)
            }
            else{
                collidedBotRightCell = true
                if(enemyPieces.includes(piece)){
                    currentThreatnedCells.push(`${x+1}${y-1}`)
                }
                else if(enemyPieces.includes(board[x+1][y-1])){
                    currentThreatnedCells.push(`${x+1}${y-1}`)
                }
            }
        }
        if(!collidedBotLeftCell && x + 1 <= 7 && y + 1 <= 7){
            if(board[x+1][y+1] === null){
                currentPath.push(`${x+1}${y+1}`)
            }
            else{
                collidedBotLeftCell = true
                if(enemyPieces.includes(piece)){
                    currentThreatnedCells.push(`${x+1}${y+1}`)
                }
                else if(enemyPieces.includes(board[x+1][y+1])){
                    currentThreatnedCells.push(`${x+1}${y+1}`)
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
