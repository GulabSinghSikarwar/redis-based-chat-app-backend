const { EventString, redisChannels, kafkaTopics } = require("../utils/strings")

const { publisher } = require('../redis_sevice/redis_service')
// Messages will be sent  to All the group members 
const sendMessage = async (socketIO, message) => {
    // Here We will sent the message  ,Meanwhile All the other clients will listen to recieve message 
    socketIO.emit(EventString.recieve_message, message)
    // publisher.publish(kafkaTopics.MESSAGE,JSON.stringify(message))
 
}


const userLeft = async (socketIO, socket, username) => {
    const message = {
        message: `${username} left the the chat`,
        username

    }
    //First Inform EveryOne in the Group that user has left the group 
    await sendMessage(socketIO, message)

    //First Inform EveryOne in the Group that user has left the group 
    await socket.broadcast.emit(EventString.user_left, username)

}

const userJoin = (socketIO, username) => {
    // First Need to Sent User name (Who have joined )to all  the users 
    socketIO.emit(EventString.new_user, username)

    const message = {
        username,
        message: `${username} joined the chat`
    }
    // Now Send User Join Message to the All group 
    sendMessage(socketIO, message)

}

// can Implement the Retrival of old chats 

module.exports = { userJoin, userLeft, sendMessage }