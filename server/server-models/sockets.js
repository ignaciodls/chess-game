

class Sockets{

    constructor(io){

        this.io = io

        this.rooms = {}

        this.socketsEvents()

    }

    socketsEvents(){

        this.io.on('connection', (socket) =>{

            socket.on('start-game', roomId => {
                
                socket.join(roomId)

                this.rooms[roomId] = {
                    roomId,
                    players:[],
                }
            })

            socket.on('join-room', roomId => {

                socket.rooms.forEach(room => {
                    if(room !== socket.id){
                        socket.to(room).emit('opponent-disconnected')
                        socket.leave(room)
                    }
                });

                if(this.rooms[roomId]){
                    if(this.rooms[roomId].players.length < 2){

                        socket.join(roomId)

                        this.rooms[roomId] = {
                            roomId,
                            players: [...this.rooms[roomId].players, socket],
                            
                        }

                        let p1Color = Math.floor(Math.random() * 2) === 0 ? 'white' : 'black'
                        let p2Color = p1Color === 'white' ? 'black' : 'white'

                        if(this.rooms[roomId].players.length === 2){
                            this.io.to(this.rooms[roomId].players[0].id).emit('color', p1Color)
                            this.io.to(this.rooms[roomId].players[1].id).emit('color', p2Color)
                        }
                    }
                    else{

                        socket.emit('already-two-players')

                    }
                }
                else{
                    socket.emit('room-does-not-exist')
                }
            })

            socket.on('board', (newBoard, roomId)=>{
                this.io.to(roomId).emit('board',newBoard)
            })

            socket.on('mate', (loserColor ,roomId) => {
                this.io.to(roomId).emit('mate',loserColor)
            })

            socket.on('end-game', roomId => {
                socket.leave(roomId)
                delete this.rooms[roomId]
            })

            socket.on('clear-before-room', () => {

                let idx = 0

                for (const roomId of socket.rooms) {
                    if(idx !== 0){
                        socket.leave(roomId)
                        this.io.to(roomId).emit('opponent-disconnected')
                        delete this.rooms[roomId]
                    }

                    idx++

                }

            })

            socket.on('disconnecting', () => {

                let idx = 0

                for (const roomId of socket.rooms) {
                    if(idx !== 0){
                        socket.leave(roomId)
                        this.io.to(roomId).emit('opponent-disconnected')
                        delete this.rooms[roomId]
                    }

                    idx++

                }

            })
        })

    }

}

module.exports = Sockets