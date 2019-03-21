const express = require('express');
const app = express();
const path = require('path');

 
/*
var server = require ( 'http' ) .Server (app);
//requerimos socket io:
const socketIO = require ('socket.io') (server);
//requerimos su metodo lisent que recibe la configuracion del chat le pasamos el listen on port:
//lo almacenamos en una constante. 

//webSocket:
socketIO.on('connection',()=>{
    console.log('new connection');
})

*/


//setting 
app.set('port', process.env.PORT || 8080);

//static file
app.use(express.static(path.join(__dirname,'public')));


//listen
//lo guardamos en una constante para poder pasarlo al socket io.
const server= app.listen(app.get('port'),()=>{
    console.log('server on port 8080')
});
//web socket:

const socketIO = require ('socket.io');
const io = socketIO(server);
io.on('connection',(socket)=>{
    console.log('new connection', socket.id);

    //este socket al me conecte lo voy a escuchar a traves del evento message.
    //data = al objeto creado en el front(chat.js) 
    //socket.on escucha
    socket.on('chatMessage', (data)=>{
        //a todos los sockets que estan conectados envia un evento:
    io.sockets.emit('reenvioMessage', data);
    })

    socket.on('chat:typing',(data)=>{
//broadcast= envia a todos menos al que lo genera
        socket.broadcast.emit('chat:typting2',data);
    })
});
