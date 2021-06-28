class Sockets{

    constructor(io){

        this.io = io

        this.socketsEvents()
    
    }

    socketsEvents(){
        
        setInterval( async() => {
            console.log(await this.io.allSockets())
        },10000)

        this.io.on('connection', (socket) =>{

            console.log('Socket connected!!')

            socket.on('disconnect', () => {
                console.log('Socket disconnected!!')
            })

            socket.on('mensaje', (mensaje) => {
                socket.emit('mensaje', mensaje)
            })

        })

    }

}

module.exports = Sockets