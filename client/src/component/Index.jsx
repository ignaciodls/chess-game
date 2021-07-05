import React, {useEffect} from 'react'
import '../styles/global.css'

import { v4 as uuidv4 } from 'uuid';

import { useSocket } from '../contexts/socketContext'
import {useHistory} from 'react-router-dom'
import {useBoard} from '../contexts/boardContext'

const Index = () => {

    const {setMyColorPieces, setMyTurn, setImGameRequester} = useBoard()
    const socket = useSocket()
    const history = useHistory()

    const startGame = () => {
        let roomId = uuidv4()
        setImGameRequester(true)
        socket.emit('start-game',roomId)
        history.push(`/game/${roomId}`)
    }

    useEffect(() => {

        socket?.emit('clear-before-room')
        setMyTurn(null)
        setMyColorPieces(null)
        setImGameRequester(false)

    },[setMyTurn, setMyColorPieces, socket, setImGameRequester])


    return (
        <>
         <div className='root'>

            <div className='wrapper'>
            <div className='chessTitle'>Chess game</div>
            <div className='text'>Press play to start a game</div>
                <div className='button' onClick={startGame}>Play!</div>
            </div>
        </div>
        </>
    )
}

export default Index
