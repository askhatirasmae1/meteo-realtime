const fs = require("fs");
const csv = require("csvtojson");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5002 });

console.log("WebSocket running on ws://localhost:5002");

wss.on("connection", (ws) => {
  console.log("Client connected");

  const sendData = async () => {
    const jsonArray = await csv().fromFile("temp.csv");

    let i = 0;

    const interval = setInterval(() => {
      if (i >= jsonArray.length) {
        i = 0; 
      }

      ws.send(JSON.stringify(jsonArray[i]));
      i++;
    }, 3000);

    ws.on("close", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });
  };

  sendData();
});