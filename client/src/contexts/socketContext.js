import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socketContext = React.createContext()

export const SocketProvider = ({children}) => {

    const [socket, setSocket] = useState(null)

    useEffect(()=> {
        setSocket(io('https://chess-game0.herokuapp.com/'))
    },[])

    return (
        <socketContext.Provider value={socket}>{children}</socketContext.Provider>
    )
}

export const useSocket = () => {
    const context = React.useContext(socketContext)
    return context
}

export default socketContext
