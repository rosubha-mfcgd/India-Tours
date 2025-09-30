const WebSocket = require('ws');

// Create a WebSocket server instance on port 8081
const wss = new WebSocket.Server({ port: 8081 });

// Event listener for new connections
wss.on('connection', ws => {
  console.log('Client connected');

  // Event listener for messages from the client
  ws.on('message', message => {
    console.log(`Received message: ${message}`);

    // Send a response back to the client
    ws.send(`Server received: ${message}`);
  });

  // Event listener for connection close
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Optional: Send a welcome message to the new client
  ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on port 8081');