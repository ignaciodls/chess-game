const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const Sockets  = require('./sockets');

class Server{

    constructor(){

        this.app = express()

        this.server = http.createServer(this.app)

        this.io = socketio( this.server, {
            cors: {
                origin: "https://chess-game-21ba5.web.app",
              }
         } );

    }

    configureSockets(){

        new Sockets(this.io)

    }


    middlewares(){

        //Middlewares

    }

    execute(){

        this.middlewares()

        this.configureSockets();

        this.server.listen( process.env.PORT )

    }

}

module.exports = Server