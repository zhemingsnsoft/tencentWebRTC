// Create WebSocket connection.
const socket = new WebSocket('wss://demo1wss.zhubb.top:443');
console.log("walaoeheheheheh")
// Connection opened
socket.addEventListener('open', function (event) {
    let pingpong = setInterval(() => {
        console.log("walaosend")
        socket.send('Hello Server!');
        }, 20000);
    // socket.send('Hello Server!');
    console.log("walaoheheheheh")
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

