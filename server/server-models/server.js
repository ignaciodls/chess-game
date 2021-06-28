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
                origin: "*",
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

        this.server.listen( 8000 , () => {
            console.log('Server is running!')
        })

    }

}

module.exports = Server