const EventString = {
    connection: 'connection',
    user_left: 'user_left',
    user_join: 'user_join',
    new_user: 'new_user',
    disconnect: 'disconnect',
    message_sent: 'message_sent',
    recieve_message: 'recieve_message',
    recieve_user_list: 'recieve_user_list',
    user_list: 'user_list'
}
const redisChannels = {
    MESSAGE: "MESSAGE"
}
const kafkaTopics = {
    MESSAGE: "MESSAGE"
}
module.exports = { EventString, redisChannels ,kafkaTopics}