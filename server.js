const app = require('./server');
const http = require('http');
const { Server } = require('socket.io');
const setupSocket = require('./socket_service/setupSocket');
const connectToDb = require('./db_service/db_service');
const Logger = require('./utils/logger_service').getLogger();
const { startMessageConsumer } = require('./kafka_service/consumer')

// Socket Initialization
const server = http.createServer(app);
const socketIO = new Server(server, {
    cors: {
        allowedHeaders: ["*"],
        origin: "*"
    }
})

startMessageConsumer()
connectToDb();
setupSocket(socketIO);
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    Logger.info(`Server listening on port ${PORT}`)
})
