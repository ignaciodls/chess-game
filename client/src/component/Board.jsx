import React, { useEffect } from 'react'
import { useBoard } from '../contexts/boardContext'
import Square from './Square'
import {useHistory, useParams} from 'react-router-dom'
import { useSocket } from '../contexts/socketContext'
import Swal from 'sweetalert2'
import {CopyToClipboard} from 'react-copy-to-clipboard'


const Board = () => {

    const {board, color, initialBoard, calculatePathsAndThreatenedCells, myColorPieces, setMyColorPieces, setMyTurn, setBoard, myTurn, imGameRequester} = useBoard()
    const socket = useSocket()
    const {roomId} = useParams()
    const history = useHistory()

    useEffect(() => {
       setBoard(initialBoard)
     }, [roomId]);

    useEffect(()=>{
        socket?.emit('join-room',roomId)
    },[socket, roomId])

    useEffect(()=>{
        if(myColorPieces){
            calculatePathsAndThreatenedCells(roomId)
        }
    },[board, myColorPieces, roomId])

    useEffect(() => {

        socket?.on('color',color => {
            setMyColorPieces(color)
            if(color === 'white'){
                setMyTurn(true)
            }
            else{
                setMyTurn(false)
            }
        })

    },[socket, setMyTurn, setMyColorPieces])

    useEffect(() => {

        socket?.on('board', newBoard=>{
            setBoard(newBoard)
            setMyTurn(!myTurn)
        })

        return () => socket?.off('board')
    },[socket, myTurn, setMyTurn, setBoard])

    useEffect(() => {

        socket?.on('mate', loserColor => {
            socket.emit('end-game', roomId)
            
            setMyTurn(null)
            setMyColorPieces(null)

            if(loserColor !== myColorPieces){
                Swal.fire({
                    title: 'You win!',
                    imageUrl:`${myColorPieces === 'white' ? 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png':'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png'}`,
                    imageWidth: 200,
                    imageHeight: 200,
                  })
                  .then(() => history.push('/'))

            }
            else{
                Swal.fire({
                    title: 'You lose!',
                    imageUrl:`${myColorPieces === 'white' ? 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png':'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png'}`,
                    imageWidth: 200,
                    imageHeight: 200,
                  })
                  .then(() => history.push('/'))
            }
        })

    },[socket, setMyColorPieces, setMyTurn, history, myColorPieces, roomId])

    useEffect(() => {

        socket?.on('room-does-not-exist', () => {
            Swal.fire({
                icon: 'error',
                title: "This room doesn't exist",
            })
            .then(() => history.push('/'))
        })

    },[socket, history])

    useEffect(() => {

        socket?.on('already-two-players', () => {
            Swal.fire({
                icon: 'error',
                title: "This room is already in game",
            })
            .then(() => history.push('/'))
        })

    },[socket, history])

    useEffect(() => {

        socket?.on('opponent-disconnected', () => {
            
            Swal.fire({
                title: 'You win!',
                text: 'Your opponent has left the game',
                imageUrl:`${myColorPieces === 'white' ? 'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png':'https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png'}`,
                imageWidth: 200,
                imageHeight: 200,
              })
              .then(() => history.push('/'))
        })

    },[socket, myColorPieces, history])


    return (
        <div className='root'>
            {
                myColorPieces?
                <div className={`${'board'} ${myColorPieces === 'black' && 'columnReverse'}`}>
                {
                    board.map((row,x) => {
                        return <div className={`${'row'}`} key={x}>
                            {
                                row.map((piece,y) => {
                                    return(
                                    <Square
                                     color={color(x,y)}
                                     key={`${x}${y}`}
                                     piece={piece}
                                     coord={`${x}${y}`}
                                     roomId={roomId}
                                     />
                                    )
                                })
                            }
                        </div>
                    })
                }
            </div>:
            <div className='waitingDiv'>
                { imGameRequester && 
                    <>
                        <div className='waitingDivRow1'>
                            <div>
                                {imGameRequester && 'Copy the link and send it to a friend ->'}
                            </div>
                            <div>
                                <CopyToClipboard text={window.location.href}><div className='copyButton'>Copy</div></CopyToClipboard>
                            </div>
                        </div>
                        <div className='waitingDivRow2'>Waiting for your opponent to enter the link...</div>
                    </>
                }
            </div>
            }


        </div>

    )
}

export default Board
