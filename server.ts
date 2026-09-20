import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("front-end"));

app.get('/', (req, res) => {
    res.json({ message: "funcionou" });
}); 
let users: string[] = [];

io.on("connection", (socket) => {
    users.push(socket.id);

    console.log(`Usuários conectados: ${users.length}`);

    socket.on("welcome", (msg) => {

        io.emit("welcome", `${msg.name} entrou no chat!`);

    });
     socket.on("chat:message", (msg) => {

        const formattedMessage = `${msg.name}: ${msg.message}`;

        io.emit("chat:sendmessage", { message: formattedMessage, senderId: msg.senderId });

    });
    socket.on("disconnect", (reason) => { users = users.filter(userID => userID !== socket.id); });

});
const PORT = process.env.PORT || 2000;

server.listen(PORT, () => console.log(`server on in http://localhost:${PORT}....`));