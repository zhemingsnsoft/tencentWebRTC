const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
// const wss = new WebSocket.Server({ port: 8080 });
let clients = [];

wss.on('connection', function connection(ws) {
    clients.push(ws);
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        clients.forEach(function(client) {
            client.send(message);
        });
    });

    // ws.send('something');
    // clients.forEach(function(client) {
    //     client.send("something");
    // });

    ws.on("close", function(code, message){
        console.log("Close the connection", code, message);
        removeClient(ws);
    });
});


function removeClient(socket) {
    if(!socket)
        return;

    var idx = -1;
    for( var i = 0; i < clients.length; i++ ){
        if( socket.id == clients[i].id ){
            idx = i;
            break;
        }
    }
    if(idx === -1)
        return;
    clients.splice(idx, 1);
}
