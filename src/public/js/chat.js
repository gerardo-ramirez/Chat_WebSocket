const socket= io();

/* se crea una variable llamada io (aqui podemos colocar el dominio o la url para enviar)
lo guardamos en una constante llamada socket que la recibimos en 
index.js en la funcion de connection
y dessde alli podemos obtener el id de ese socket que es automatioco */
//obtenemos los id:
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
//creamos la logica:

btn.addEventListener('click', ()=>{
    //eviamos datos obtenidos al servidor a traves de la costante llamada socket.
   //enviamos en objeto pues solo le podemos pasar hasta 2 sparametro.
   //socket.emit envia
   //socket.on escucha
    socket.emit('chatMessage',{
        username: username.value,
        message: message.value
    } );
})

//EVENTOS DE ESCUCHA:


//recibimos nuevamente del servidor (index.js):
socket.on('reenvioMessage', (data)=>{

    actions.innerHTML = '';
    //insertamos en la const output:

    output.innerHTML +=`<p><strong> ${data.username}: </strong>${data.message}
    </p>
    `;

});
//mensaje de typing:
message.addEventListener('keypress',()=>{
    socket.emit('chat:typing', username.value);
});
socket.on('chat:typting2', (data)=>{
    
    actions.innerHTML= `<p><em>${data} esta escribiendo...</em></p>`

});



