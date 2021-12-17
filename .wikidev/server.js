const fs = require('fs');
const { WebSocketServer } = require('ws');

const scriptPath = `${__dirname}/../script.js`;
let scriptContent = "";
let currentConnections = [];

// A function that sets scriptContent to the contents of script.js
const setScriptContent = () => {
    scriptContent = fs.readFileSync(scriptPath, "utf8");
};

// A function that processes a message from the websocket
const processMessage = (ws, message) => {
    // Any message just gets the script.js file - this function is just here for futher development
    ws.send(scriptContent);
};


fs.watchFile(scriptPath, () => {
    console.log("New script.js detected. Reloading...");
    setScriptContent();
    currentConnections.forEach(ws => ws.send(scriptContent));
});



module.exports = async () => {
    setScriptContent();

    // Open a new websocket on port 6767
    const wss = new WebSocketServer({ port: 6767 });
    console.log("Server online. Click the stop button in VS Code to stop the server.");

    wss.on('connection', function connection(ws) {
        currentConnections.push(ws);
        ws.on('message', function message(data) {
            processMessage(ws, data);
        });

        ws.on('close', function close() {
            currentConnections.splice(currentConnections.indexOf(ws), 1);
        });
        
        ws.send(scriptContent);
    });
};