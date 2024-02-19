const { EventString, redisChannels } = require("../utils/strings");

const chatHandeler = require('../socket_service/chatHandeler')
const clients = {}
const { subscriber, publisher } = require('../redis_sevice/redis_service')
const { getLogger } = require('../utils/logger_service')
const { producMessage } = require('../kafka_service/kafkaProducer');
const kafka = require("../kafka_service/kafkaClient");
const Logger = getLogger();


const setupSocket = (socketIO, redisService) => {
    subscriber.subscribe(redisChannels.MESSAGE)

    // console.log(" socket IO-------->",socketIO);
    socketIO.on('connection', (socket) => {
        // Join Event 
        Logger.info(`User Connected ${socket.id}`)

        socket.on(EventString.user_join, (username) => {
            const usernames = []

            Object.keys(clients).forEach(id => {
                usernames.push(clients[id])
            });

            // Sent the Already Present Users in the room to the newly Joined User

            // TODO: remove these chatHandeler and userlist event 

            // socket.emit(EventString.recieve_user_list, usernames)
            // Now sent the message of Joining 
            // chatHandeler.userJoin(socketIO, username);

            // Now Adding the username to the 
            clients[socket.id] = username


        })
        // User Left Event 

        socket.on(EventString.disconnect, () => {
            const username = socket[socket.id]
            // TODO:remove this user left event
            // chatHandeler.userLeft(socketIO, socket,)
        })

        socket.on(EventString.message_sent, async (message) => {
            Logger.debug(`Message Recived: ${message}`)
            Logger.debug(`Message About to be Published : ${message}`)

            await publisher.publish(redisChannels.MESSAGE, JSON.stringify(message))
        })
        // Message Events 
    })

    subscriber.on("message", async (channel, message) => {
        if (channel === redisChannels.MESSAGE) {
            Logger.debug(`New Message Recieved from Redis , message: ${JSON.stringify(message)}`)

            Logger.debug(`Mesaage Sending to All connected user , message: ${JSON.stringify(message)}`)
            chatHandeler.sendMessage(socketIO, message);

            Logger.debug(`Mesaage Produced To Kafka`)
            producMessage(message)
        }

    })


}
module.exports = setupSocket;