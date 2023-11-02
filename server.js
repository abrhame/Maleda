const express = require("express");

const socketio = require("socket.io");

const PORT = 3000;

const app = express();

const expressServer = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})

const io = socketio(expressServer, {
    cors: {
        origin: ""
    }
})


module.exports = {
    io,
    expressServer,
    app
}