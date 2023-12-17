const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const createMQTTConnection = require('./config/mqttConfig');
const socketIO = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const mqttClient = createMQTTConnection(); // Khai báo biến client ở đây

const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME || 'localhost';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
configViewEngine(app);
app.use('/', webRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

mqttClient.on('message', (topic, message) => { // Sửa lỗi ở đây, thay vì `client` sử dụng `mqttClient`
  console.log(`Received MQTT message on topic ${topic}: ${message.toString()}`);
  
  // Gửi dữ liệu từ MQTT đến client thông qua WebSocket
  io.emit('mqtt-message', JSON.parse(message.toString()));
});

const session = require('express-session')

app.use(session({
  secret: 'hung123',
  resave: false,
  saveUninitialized: true
}));

server.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`);
});
